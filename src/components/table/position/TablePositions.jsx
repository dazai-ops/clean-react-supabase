
const TablePositions = ({positions, employees, removePosition, onEdit}) => {

  const countEmployees = employees.reduce((acc, emp) => {
    const id = emp.employee_position_id
    if(id != null) acc[id] = (acc[id] || 0) + 1
    return acc
  }, {})

  return (
    <div className="w-full rounded-lg pb-2">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-0 bg-base-300/20 *:first:rounded-s-md *:last:rounded-e-md">
              <th>Position Name</th>
              <th>Employees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map(position => (
              <tr key={position.id}>
                <td>{position.position_name}</td>
                <td>{countEmployees[position.id] || 0}</td>
                <td>
                  <button className="btn btn-circle btn-text btn-sm" aria-label="Action button" onClick={() => onEdit(position)}><span className="icon-[tabler--pencil] size-5"></span></button>
                  <button className="btn btn-circle btn-text btn-sm" aria-label="Action button" onClick={() => removePosition(position.id)}><span className="icon-[tabler--trash] size-5"></span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablePositions