import dayjs from 'dayjs'

export function aggregateForecastByDay(forecastList: any[]) {
  const days: Record<string, any[]> = {}
  forecastList.forEach((item) => {
    const day = dayjs(item.dt_txt).format('YYYY-MM-DD')
    days[day] = days[day] || []
    days[day].push(item)
  })
  return Object.entries(days).map(([date, items]) => {
    const temps = items.map(i => i.main.temp)
    const min = Math.min(...temps)
    const max = Math.max(...temps)
    const avg = temps.reduce((a,b)=>a+b,0)/temps.length
    const icon = items[0].weather?.[0]?.icon
    const desc = items[0].weather?.[0]?.description
    return { date, min, max, avg, icon, desc, items }
  })
}
