import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputTextCKEditorColumn,
    InputTextColumn,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import { addAdCategoryPage as strings } from "../../../../constants/strings";
import { addAdCategorySchema as schema } from "../../../validations";

const AddAdCategory = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <SubmitCancelForm
            page={"AdCategories"}
            funcs={funcs}
            handleSubmit={handleSubmit}
            errors={errors}
        >
            <InputTextColumn
                field="title"
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

export default AddAdCategory;
