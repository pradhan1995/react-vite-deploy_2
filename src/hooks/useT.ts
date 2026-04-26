// src/hooks/useT.ts
import { useLangStore } from '../store/langStore';
import { translations, type TranslationKey } from '../i18n/translations';

export function useT() {
  const lang = useLangStore((s) => s.lang);
  return (key: TranslationKey): string => translations[lang][key];
}

// src/hooks/useAsync.ts
import { useState, useEffect, useCallback, useRef } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });
  const mounted = useRef(true);

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fn();
      if (mounted.current) setState({ data, loading: false, error: null });
    } catch (e) {
      if (mounted.current) setState({ data: null, loading: false, error: (e as Error).message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mounted.current = true;
    execute();
    return () => { mounted.current = false; };
  }, [execute]);

  return { ...state, refetch: execute };
}
