import { filterOptions } from "@/config";

import { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function ProductFilter(){
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
                                    <Checkbox />
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