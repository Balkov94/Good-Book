import React, { useState } from "react";
import { RoleEnum, StatusEnum } from "../../Rest-APi-Client/shared-types";
import styles from "./Filters.module.css";

export interface IFilterValues {
     role: string,
     status: string
     searchText: string,
}
interface IFilterProps {
     onfilterChange(newFilterValues: IFilterValues): void;
     filterValues: IFilterValues;
}

function Filters({ onfilterChange, filterValues }: IFilterProps) {
     const [role, setRole] = useState<string>(filterValues.role);
     const [status, setStatus] = useState<string>(filterValues.status);
     const [searchText, setSearchText] = useState(filterValues.searchText);


     const hadnleRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setRole(event.target.value);

     }
     const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setStatus(event.target.value);
     }

     const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(event.target.value);
     }

     const onFilterFormChange = (event: React.ChangeEvent<any>) => {
          event.preventDefault();
          const propName = event.target.name;
          const propValue = event.target.value;
          //dynamically filter (without submit)
          //create new filter and overide last changed input 
          let newFilter = { role: role, status: status, searchText: searchText, [propName]: propValue }
          onfilterChange({ ...newFilter })
     }
   

     return (
          <div className={styles.filterContainer}>
               <form action="submit" onChange={(event) => onFilterFormChange(event)} className={styles.filterForm}>
                    {/* <div> */}
                         <label htmlFor="searchText">Search by names or username:</label>
                         <input type="text" name="searchText" id="searchText"
                              value={searchText}
                              onChange={(event) => handleInput(event)}     
                         />
                         <label htmlFor="filter-role">Filter by Role:</label>
                         <select name="role" id="filter-role"
                              onChange={(event) => hadnleRole(event)}
                              defaultValue={role}>
                              <option value={"All"}>All</option>
                              <option value={RoleEnum.User}>User</option>
                              <option value={RoleEnum.Admin}>Admin</option>
                         </select>

                         <label htmlFor="filter-status">Filter by Status:</label>
                         <select name="status" id="filter-status"
                              onChange={(event) => handleStatus(event)}
                              defaultValue={"All"}>
                              <option value={"All"}>All</option>
                              <option value={StatusEnum.Active}>Active</option>
                              <option value={StatusEnum.Deactivated}>Deactivated</option>
                              {/* <option value={StatusEnum.Suspended}>Suspended</option> */}
                         </select>
                    {/* </div> */}
               </form>
          </div>

     );
}

export default Filters;