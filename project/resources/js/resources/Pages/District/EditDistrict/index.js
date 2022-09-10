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
import { editDistrictPage as strings } from "../../../../constants/strings";
import { editDistrictSchema as schema } from "../../../validations";
import { setPagePropsAction } from "../../../../state/layout/layoutActions";

const EditDistrict = () => {
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
            page={"Districts"}
            funcs={funcs}
            setValue={setValue}
            handleSubmit={handleSubmit}
            errors={errors}
        >
            <InputTextColumn
                field="name"
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

export default EditDistrict;
