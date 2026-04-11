import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { applyWSMessage, setLastError, setWsConnected } from '../../app/store/fleetSlice';

function wsUrl() {
  const env = import.meta.env.VITE_WS_URL;
  if (env) return env;
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${window.location.host}/ws`;
}

/**
 * Conexión WebSocket global hacia la API (capa compartida, como SocketController en TraccarWeb).
 */
export function useFleetSocket(enabled = true) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    let ws;
    let closed = false;
    let attempt = 0;

    const connect = () => {
      if (closed) return;
      ws = new WebSocket(wsUrl());
      ref.current = ws;
      ws.onopen = () => {
        attempt = 0;
        dispatch(setWsConnected(true));
        dispatch(setLastError(null));
      };
      ws.onclose = () => {
        dispatch(setWsConnected(false));
        if (closed) return;
        const delay = Math.min(30_000, 1000 * 2 ** attempt);
        attempt += 1;
        setTimeout(connect, delay);
      };
      ws.onerror = () => {
        dispatch(setLastError('WebSocket error'));
      };
      ws.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          dispatch(applyWSMessage(data));
        } catch {
          dispatch(setLastError('Mensaje WS inválido'));
        }
      };
    };

    connect();
    return () => {
      closed = true;
      if (ref.current) {
        ref.current.close();
      }
    };
  }, [dispatch, enabled]);
}
