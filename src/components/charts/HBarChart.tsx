import { Bar, BarChart, LabelList, Rectangle, Text, Tooltip, XAxis, YAxis, type BarShapeProps } from 'recharts'

export interface BarSeries {
  key: string
  name: string
  /** Cor fixa da série. Sem ela, cada linha usa `row.color`. */
  color?: string
}

export interface BarRow {
  label: string
  color?: string
  [key: string]: string | number | null | undefined
}

interface HBarChartProps {
  data: BarRow[]
  series: BarSeries[]
  ariaLabel: string
  /** Largura reservada aos rótulos do eixo (o texto quebra em linhas). */
  labelWidth?: number
  max?: number
  formatValue?: (value: number) => string
}

const BAR_SIZE = 14
const INK_SOFT = '#3d4a44'
const MUTED = '#5f6c66'

const defaultFormat = (value: number) => `${Math.round(value)}%`

/**
 * Barras horizontais finas (≤ 24px, ponta arredondada de 4px), valor escrito na ponta
 * e tooltip ao passar o mouse. Os rótulos quebram em linhas para caber no celular.
 */
export function HBarChart({ data, series, ariaLabel, labelWidth = 104, max = 100, formatValue = defaultFormat }: HBarChartProps) {
  const rowHeight = series.length > 1 ? 30 + series.length * (BAR_SIZE + 2) : 44
  const height = data.length * rowHeight + 8

  return (
    <BarChart
      responsive
      style={{ width: '100%', height }}
      data={data}
      layout="vertical"
      margin={{ top: 0, right: 48, bottom: 0, left: 0 }}
      barGap={2}
      barCategoryGap={series.length > 1 ? 14 : 15}
      accessibilityLayer
      aria-label={ariaLabel}
    >
      <XAxis type="number" domain={[0, max]} hide />
      <YAxis
        type="category"
        dataKey="label"
        width={labelWidth}
        axisLine={false}
        tickLine={false}
        interval={0}
        tick={({ x, y, payload }) => (
          <Text
            x={Number(x) - 8}
            y={Number(y)}
            width={labelWidth - 12}
            textAnchor="end"
            verticalAnchor="middle"
            fontSize={13}
            fill={INK_SOFT}
            lineHeight={16}
          >
            {String(payload.value)}
          </Text>
        )}
      />
      <Tooltip
        cursor={{ fill: '#f7f7f3' }}
        formatter={(value, name) => [formatValue(Number(value)), name]}
        contentStyle={{
          borderRadius: 12,
          border: '1px solid #e4e6df',
          boxShadow: '0 6px 20px -8px rgb(23 32 28 / 0.18)',
          fontSize: 13,
        }}
        labelStyle={{ color: '#17201c', fontWeight: 600, marginBottom: 4 }}
        itemStyle={{ color: INK_SOFT, padding: 0 }}
      />
      {series.map((item) => (
        <Bar
          key={item.key}
          dataKey={item.key}
          name={item.name}
          barSize={BAR_SIZE}
          radius={[0, 4, 4, 0]}
          isAnimationActive={false}
          shape={(props: BarShapeProps) => (
            <Rectangle {...props} fill={item.color ?? (props.payload as BarRow | undefined)?.color ?? '#2f9466'} />
          )}
          background={{ fill: '#f2f3ee', radius: 4 }}
        >
          <LabelList
            dataKey={item.key}
            position="right"
            offset={8}
            fill={MUTED}
            fontSize={12}
            fontWeight={600}
            formatter={(value) => (value === null || value === undefined ? '' : formatValue(Number(value)))}
          />
        </Bar>
      ))}
    </BarChart>
  )
}
