import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"
import { cn } from "../../lib/utils"
// We assume we can import these card components. If not, we can inline or assume parent composition.
// For the purpose of "putting this new model", we should probably make NexusChart self-contained or use the requested layout internally.
// However, typically a Chart component should just be the chart.
// But the prompt says "Place this new chart model", implying the whole card structure shown.
// I will implement a "NexusChartCard" wrapper inside here or compositionally. 
// Given the prompt "Improve layout of other charts", I will expose a prop to render the card frame.

// --- Theme Colors ---
const COLORS = [
  "#3b82f6", // Blue
  "#facc15", // Yellow
  "#ef4444", // Red
  "#06b6d4", // Cyan
  "#10b981", // Green
  "#8b5cf6", // Purple
]

// --- Types ---
export interface NexusChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  type: "bar" | "line" | "pie" | "scatter" | "donut"
  dataKeys?: string[] // For Bar/Line/Scatter: keys to plot. For Scatter: [x, y, z?]
  indexKey?: string // For Bar/Line: X-axis key. For Scatter: nameKey or similar
  colors?: string[]
  height?: number | string
  
  // Card/Layout Props
  title?: string
  subtitle?: string
  moreInfoLink?: string
  axisLabelX?: string
  axisLabelY?: string
  grid?: boolean
  
  // Pie/Donut specifics
  centerLabel?: string // For Donut
}

const NexusChart = React.forwardRef<HTMLDivElement, NexusChartProps>(
  ({ 
    className, 
    data, 
    type, 
    dataKeys = ["value"], 
    indexKey = "name", 
    colors = COLORS, 
    height = 350, 
    title,
    subtitle,
    moreInfoLink,
    axisLabelX,
    axisLabelY,
    grid = true,
    centerLabel,
    ...props 
  }, ref) => {
    
    const GridComponent = grid ? <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" /> : null
    
    const TooltipComponent = (
        <Tooltip 
           contentStyle={{ backgroundColor: "#1f2937", borderColor: "rgba(255,255,255,0.1)", borderRadius: "0.5rem", color: "#f3f4f6" }}
           itemStyle={{ color: "#f3f4f6" }}
           cursor={{ fill: 'rgba(255,255,255,0.05)' }}
        />
    )

    const renderChartContent = () => {
        if (type === "bar") {
            return (
              <BarChart data={data}>
                {GridComponent}
                <XAxis dataKey={indexKey} axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} dy={10} label={axisLabelX ? { value: axisLabelX, position: 'insideBottom', offset: -5, fill: '#9ca3af', fontSize: 12 } : undefined} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} label={axisLabelY ? { value: axisLabelY, angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 12 } : undefined} />
                {TooltipComponent}
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                {dataKeys.map((key, index) => (
                  <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} maxBarSize={50} />
                ))}
              </BarChart>
            )
          }
      
          if (type === "line") {
            return (
              <LineChart data={data}>
                {GridComponent}
                <XAxis dataKey={indexKey} axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                {TooltipComponent}
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                {dataKeys.map((key, index) => (
                  <Line 
                      key={key} 
                      type="monotone" 
                      dataKey={key} 
                      stroke={colors[index % colors.length]} 
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                ))}
              </LineChart>
            )
          }

          if (type === "scatter") {
             // For scatter, we expect dataKeys[0] = x, dataKeys[1] = y
             const xKey = dataKeys[0] || "x"
             const yKey = dataKeys[1] || "y"
             
             return (
                 <ScatterChart>
                     {GridComponent}
                     <XAxis type="number" dataKey={xKey} name={xKey} axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} dy={10} unit={axisLabelX} />
                     <YAxis type="number" dataKey={yKey} name={yKey} axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} unit={axisLabelY} />
                     {TooltipComponent}
                     <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                     <Scatter name={title || "Data"} data={data} fill={colors[0]}>
                        {data.map((_, index: number) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                         ))}
                     </Scatter>
                 </ScatterChart>
             )
          }
      
          if (type === "pie" || type === "donut") {
              const valueKey = dataKeys[0] || "value"
              const isDonut = type === "donut"
              
              return (
                  <PieChart>
                     <Tooltip 
                        contentStyle={{ backgroundColor: "#1f2937", borderColor: "rgba(255,255,255,0.1)", borderRadius: "0.5rem", color: "#f3f4f6" }}
                        itemStyle={{ color: "#f3f4f6" }} 
                     />
                     <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        iconType="circle"
                     />
                     <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={isDonut ? "60%" : 0}
                        outerRadius="80%"
                        paddingAngle={isDonut ? 5 : 0}
                        dataKey={valueKey}
                        nameKey={indexKey}
                        stroke="none"
                     >
                        {data.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                     </Pie>
                     {isDonut && centerLabel && (
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-bold text-xl">
                            {centerLabel}
                        </text>
                     )}
                  </PieChart>
              )
          }
          return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden", // Card aesthetics
          "bg-[#0f172a] border-slate-800 text-slate-100", // Enforcing dark theme as per prompt "novo modelo"
          className
        )}
        {...props}
      >
        {(title || subtitle) && (
            <div className="flex flex-col space-y-1.5 p-6 pb-2">
                {title && <h3 className="font-semibold leading-none tracking-tight text-xl">{title}</h3>}
                {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
            </div>
        )}
        
        <div className="p-6 pt-0 flex-1 min-h-0 relative">
            <ResponsiveContainer width="100%" height={height as any}>
                {renderChartContent() || <div />}
            </ResponsiveContainer>
        </div>
      </div>
    )
  }
)
NexusChart.displayName = "NexusChart"

export { NexusChart }
