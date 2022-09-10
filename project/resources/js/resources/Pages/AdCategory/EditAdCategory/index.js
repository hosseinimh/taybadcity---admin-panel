import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputTextCKEditorColumn,
    InputTextColumn,
    SubmitCancelForm,
} from "../../../components";
import * as funcs from "./funcs";
import { editAdCategoryPage as strings } from "../../../../constants/strings";
import { editAdCategorySchema as schema } from "../../../validations";
import { setPagePropsAction } from "../../../../state/layout/layoutActions";

const EditAdCategory = () => {
    const dispatch = useDispatch();
    const _ls = useSelector((state) => state.layoutReducer);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        return () => {
            dispatch(setPagePropsAction({ content: null }));
        };
    }, []);

    return (
        <SubmitCancelForm
            page={"AdCategories"}
            funcs={funcs}
            setValue={setValue}
            handleSubmit={handleSubmit}
            errors={errors}
        >
            <InputTextColumn
                field="title"
                register={register}
                strings={strings}
            />
            <InputTextCKEditorColumn
                content={_ls?.pageProps?.content}
                field="description"
                strings={strings}
                setContent={funcs.setContent}
            />
        </SubmitCancelForm>
    );
};

export default EditAdCategory;
