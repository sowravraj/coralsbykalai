import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const Commonform = ({formControls,formData, setFormData, onSubmit,buttonText}) => {

    const renderInputsByComponentType = (getControlItems)=>{
        let element = null
        const value = formData[getControlItems.name] || ""
        switch (getControlItems.componentType) {
            case "input":
                element=<Input
                    name={getControlItems.name}
                    placeholder={getControlItems.placeholder}
                    id={getControlItems.id}
                    type={getControlItems.type}
                    value={value}
                    onChange={event=>setFormData({
                        ...formData,
                        [getControlItems.name]:event.target.value
        })}
                />
                
                break;

                case "select":
                    element=<Select onValueChange={(value=>setFormData({
                        ...formData,
                        [getControlItems.name] : value
                    }))} value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItems.placeholder}></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItems.options &&
                                getControlItems.options.length > 0 ?
                                getControlItems.options.map(optionItem=><SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : 
                                null
                            }
                        </SelectContent>
                        </Select>
                    
                    break;

                case "textarea":
                    element=<Textarea
                        name={getControlItems.name}
                        placeholder={getControlItems.placeholder}
                        id={getControlItems.id}
                        type={getControlItems.type}
                        value={value}
                        onChange={event=>setFormData({
                            ...formData,
                            [getControlItems.name]:event.target.value
            })}
                    />
                    
                    break;
        
            default:
                element=<Input
                    name={getControlItems.name}
                    placeholder={getControlItems.placeholder}
                    id={getControlItems.id}
                    type={getControlItems.type}
                    value={value}
                    onChange={event=>setFormData({
                        ...formData,
                        [getControlItems.name]:event.target.value
        })}
                />
                break;
        }
        return element;
    }

  return (
    <form onSubmit={onSubmit}>
        <div className='felx flex-col gap-3' >
            {
                formControls.map(controlItem => <div key={controlItem.name} className='grid gap-1.5 w-full'>
                    <label className='mb:1 mt-1 font-bold' > {controlItem.label}</label>
                    <div className='mb-3'>
                        {
                            renderInputsByComponentType(controlItem)
                        }                       
                    </div>
                </div>)
            }
        </div>
        <Button type="submit" className="mt-2 w-full bg-black rounded"><p className='text-white'>{buttonText}</p></Button>
    </form>
  )
}

export default Commonform