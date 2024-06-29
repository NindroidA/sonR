/* eslint-disable react/no-unknown-property */

const DebugGrid: React.FC<{ size?: number; divisions?: number; centerColor?: string; lineColor?: string }> = ({
  size = 10,
  divisions = 10,
  centerColor = 'red',
  lineColor = 'white'
}) => (
  <gridHelper args={[size, divisions, centerColor, lineColor]} />
);

export default DebugGrid;
