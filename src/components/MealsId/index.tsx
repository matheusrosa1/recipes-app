import { useParams } from 'react-router-dom';

function MealsId() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Specific Meal</h1>
      <p>{id}</p>
    </div>
  );
}
export default MealsId;
