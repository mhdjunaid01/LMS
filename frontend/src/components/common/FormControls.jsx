// FormControls.js
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const FormControls = ({ 
  formControls = [], 
  formData, 
  setFormData,
  errors = {} // Add errors prop
}) => {
  const renderComponentByType = (getControlItem) => {
    let element = null;
    const currentControlItemValue = formData[getControlItem.name] || "";
    const errorMessage = errors[getControlItem.name];

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <div>
            <Input
              id={getControlItem.name}
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              type={getControlItem.type}
              value={currentControlItemValue}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: getControlItem.type === 'number' 
                    ? Number(event.target.value) 
                    : event.target.value,
                })
              }
            />
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>
        );
        break;

      case "select":
        element = (
          <div>
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: value,
                })
              }
              value={currentControlItemValue}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={getControlItem.label} />
              </SelectTrigger>
              <SelectContent>
                {getControlItem.options && getControlItem.options.length > 0
                  ? getControlItem.options.map((optionItems) => (
                      <SelectItem
                        key={optionItems.value}
                        value={optionItems.value}
                      >
                        {optionItems.label}
                      </SelectItem>
                    ))
                  : null}
              </SelectContent>
            </Select>
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>
        );
        break;
        
      case "textarea":
        element = (
          <div>
            <Textarea
              id={getControlItem.name}
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              value={currentControlItemValue}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
            />
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>
        );
        break;

      default:
        element = (
          <div>
            <Input
              id={getControlItem.name}
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              type={getControlItem.type}
              value={currentControlItemValue}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
            />
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>
        );
        break;
    }
    return element;
  };

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem, index) => {
        return (
          <div key={controlItem.name || index}>
            <Label htmlFor={controlItem.name} className={"p-2"}>
              {controlItem.label}
            </Label>
            {renderComponentByType(controlItem)}
          </div>
        );
      })}
    </div>
  );
};

export default FormControls;