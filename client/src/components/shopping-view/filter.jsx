import { filterOptions } from "@/config";

import { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function ProductFilter({filters,handleFilters}){
    return (
    <div className="rounded-lg shadow-sm">
        <div className="p-4 border-b">
            <h2 className="text-lg font-extrabold">Filters</h2>
        </div>
        <div className="p-4 space-y-4"> 
            {
                Object.keys(filterOptions).map(keyItem=><Fragment>
                    <div>
                        <h3 className="text-base font-bold">{keyItem}</h3>
                        <div className="grid gap-2 mt-2">
                            {
                                filterOptions[keyItem].map(option=>(<Label className=" flex font-medium items-center gap-2 font-normal ">
                                    <Checkbox  className="rounded border-2 border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white"
  
                                     
                                    checked={
                                        filters && Object.keys(filters).length>0 &&
                                        filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                                    } onCheckedChange={()=>handleFilters(keyItem,option.id)} />
                                    {option.label}
                                </Label>))
                            }
                        </div>
                    </div>
                    <Separator />
                </Fragment>)
            }
        </div>
    </div>
)}