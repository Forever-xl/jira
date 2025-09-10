import React, {} from 'react'

export const List = ({list,users}) => {
    return (
      <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    {/*?左侧为undefined时，右侧为默认值*/}
                    <td>{users.find(user => String(user.id) === String(project.personId))?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
      </table>
    )
}
