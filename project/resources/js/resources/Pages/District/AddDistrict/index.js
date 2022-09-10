import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputTextCKEditorColumn,
    InputTextColumn,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import { addDistrictPage as strings } from "../../../../constants/strings";
import { addDistrictSchema as schema } from "../../../validations";

const AddDistrict = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm
            page={"Districts"}
            funcs={funcs}
            handleSubmit={handleSubmit}
            errors={errors}
        >
            <InputTextColumn
                field="name"
                register={register}
                strings={strings}
            />
            <InputTextCKEditorColumn
                field="description"
                strings={strings}
                setContent={funcs.setContent}
            />
        </SubmitCancelForm>
    );
};

export default AddDistrict;
