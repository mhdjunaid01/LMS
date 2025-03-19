import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea"; // Assuming Textarea is imported correctly

const FormControls = ({ formControls = [], formData, setFormData }) => {
  const renderComponentByType = (getControlItem) => {
    let element = null;
    const currentControlItemValue = formData[getControlItem.name]||"";

    switch (getControlItem.componentType) {
      case "input":
        element = (
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
        );
        break;

      case "select":
        element = (
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
      <SelectItem key={optionItems.value} value={optionItems.value}>
        {optionItems.label}
      </SelectItem>
    ))
  : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
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
        );
        break;
      default:
        element = (
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
        );
        break;
    }
    return element;
  };

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem,index) => {
              return (
                <div key={controlItem.name||index}>
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
