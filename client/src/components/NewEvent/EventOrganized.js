import React from "react";
import Select from "./Select/Select";

export default function EventOrganized({ formData, setFormData }) {
  return (
    <>
      <Select
        formData={formData}
        setFormData={setFormData}
        name="Event Kind"
        menuItems={["Workshop", "Seminar"]}
        initialValue=""
      />
    </>
  );
}
