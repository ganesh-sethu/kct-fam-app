import React from 'react';
import BudgetUsed from "./BudgetUsed"

export default function App({departments}) {
  
    return (
      <div>
        <BudgetUsed departments={departments}/>
      </div>
    );
}
