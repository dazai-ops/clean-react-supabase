import { useMemo } from 'react'

const TableEmployees = ({employees, positions, onEdit, removeEmployee}) => {

  const positionNameById = useMemo( () =>
    positions.reduce((acc, p) => {
      acc[p.id] = p.position_name
      return acc
    }, {}),
    [positions]
  )

  return (
    <div className="w-full rounded-lg pb-2">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-0 bg-base-300/20 *:first:rounded-s-md *:last:rounded-e-md">
              <th>Name</th>
              <th>Age</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => {
              const positionName = positionNameById[emp.employee_position_id]
              return (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.age ? emp.age + ' YO' : 'N/A'}</td>
                  <td><span className="badge badge-soft badge-success text-xs">{positionName ?? 'N/A'}</span></td>
                  <td>
                    <button className="btn btn-circle btn-text btn-sm" aria-label="Action button" onClick={() => onEdit(emp)}><span className="icon-[tabler--pencil] size-5"></span></button>
                    <button className="btn btn-circle btn-text btn-sm" aria-label="Action button" onClick={() => removeEmployee(emp.id)}><span className="icon-[tabler--trash] size-5"></span></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableEmployees