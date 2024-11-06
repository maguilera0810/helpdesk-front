// src/components/BarChartComponent.tsx
import { FC, useMemo } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts';
import { useDataAnalytics } from '../../hooks/analytics/useDataAnalytics';


interface IssueCategoriesPieChartProps {
  title?: string;
}

const IssueCategoriesPieChart: FC<IssueCategoriesPieChartProps> = ({ title = "Problemas por Categoria" }) => {
  const noData = [{ label: "SIN DATOS", value: 1 }]
  const { issueCategories } = useDataAnalytics();
  const total = useMemo(() => issueCategories.reduce((acc, curr) => acc + curr.value, 0) || 1, [issueCategories])

  const aggregatedData = useMemo(() => {
    const items = issueCategories.map(e => ({ label: e.title, value: e.value }));
    const sortedCategories = [...items].sort((a, b) => b.value - a.value);
    const naCategory = sortedCategories.find(item => item.label === "N/A");
    const topCategories = sortedCategories.filter(item => item.label !== "N/A").slice(0, 7);
    const otherCategories = sortedCategories.filter(item => !topCategories.includes(item) && item.label !== "N/A");
    const othersValue = otherCategories.reduce((acc, curr) => acc + curr.value, 0);
    const result = [
      ...topCategories,
      ...(naCategory ? [naCategory] : []), // Agrega "N/A" si existe
      ...(othersValue > 0 ? [{ label: "Otros", value: othersValue }] : []) // Agrega "Otros" si hay datos
    ];
    return result.length ? result : noData;
  }, [issueCategories]);

  return (
    <Paper elevation={3} sx={{ padding: 2, height: '100%', width: '100%', minWidth: { xs: '400px', sm: '500px' } }}>
      <Typography variant="h6" component="div" sx={{ mb: 2, textAlign: 'center' }}>
        {title}
      </Typography>
      <PieChart
        height={300}
        series={[
          {
            arcLabel: (item) => `${((item.value / total) * 100).toFixed(2)}%`,
            arcLabelMinAngle: 15,
            arcLabelRadius: '80%',
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            paddingAngle: 0.5,
            cornerRadius: 5,
            data: aggregatedData,
          },
        ]}
      />
    </Paper>
  );
};

export default IssueCategoriesPieChart;
