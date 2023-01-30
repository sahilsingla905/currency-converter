import React from 'react';
import { useTable } from 'react-table';
 
 export const Table = ({ data, columns, className = "", rowProps = () => ({}) }) => {
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })
 
   return (
     <table {...getTableProps()} className={` bg-white  shadow-silver-500/50 ${className}`}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 className="p-3 font-bold text-left border-b-2 border-silver"
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps(rowProps(row))}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     className="p-2.5 border-b-2 border-silver"
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
         <tr>
            {!data.length && (
              <td colSpan="10000" className="p-2.5 text-center uppercase">No Data Available</td>
            )}
          </tr>
       </tbody>
     </table>
   )
 }