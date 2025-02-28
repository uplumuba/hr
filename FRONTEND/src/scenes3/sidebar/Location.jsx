import React from "react";
import InputField from "../../components/InputField";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4
        style={{
          marginBottom: "0.5rem",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          fontWeight: "500",
        }}
      >
        Location
      </h4>
      <div>
        <InputField handleChange={handleChange} value="" title="All" name="location" />
        <InputField handleChange={handleChange} value="adama" title="adama" name="location" />
        <InputField handleChange={handleChange} value="bishoftu" title="bishoftu" name="location" />
        <InputField handleChange={handleChange} value="adissabeba" title="adissabeba" name="location" />
        <InputField handleChange={handleChange} value="bahirdar" title="bahirdar" name="location" />
        <InputField handleChange={handleChange} value="gonder" title="gonder" name="location" />
        <InputField handleChange={handleChange} value="mekele" title="mekele" name="location" />
     </div>
    </div>
  );
};

export default Location;
