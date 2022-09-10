import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { Page } from "../Pages/_layout";
import Table from "./Table";

const AddList = ({ page, funcs, strings, renderHeader, renderItems }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _ls = useSelector((state) => state.layoutReducer);
    const [params, setParams] = useState({});
    const newParams = useParams();

    funcs.init(dispatch, navigate);

    if (JSON.stringify(params) !== JSON.stringify(newParams)) {
        setParams(newParams);
    }

    useEffect(() => {
        funcs.onLayoutState();
    }, [_ls]);

    useEffect(() => {
        funcs.onLoad(params);
    }, [params]);

    return (
        <Page page={page}>
            <div className="row mb-2">
                <div className="col-sm-12 mb-4">
                    <button
                        className="btn btn-success px-4"
                        type="button"
                        title={strings.add}
                        onClick={funcs.onAdd}
                        disabled={_ls?.loading}
                    >
                        {_ls?.loading}
                        {strings.add}
                    </button>
                </div>
            </div>
            <div className="row mb-4">
                <Table renderHeader={renderHeader} renderItems={renderItems} />
            </div>
        </Page>
    );
};

export default AddList;
