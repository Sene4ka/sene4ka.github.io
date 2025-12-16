import { useLocalStorage } from './useLocalStorage'

export default function useUnits() {
  const [units, setUnits] = useLocalStorage<'metric' | 'imperial'>('units', 'metric')
  const toggle = () => setUnits(u => u === 'metric' ? 'imperial' : 'metric')
  return { units, setUnits, toggle }
}
