import React from "react";
import { useSelector } from "react-redux";

import {
    adCategoryiesPage as strings,
    general,
} from "../../../../constants/strings";
import * as funcs from "./funcs";
import { AddList, TableItems } from "../../../components";
import { basePath } from "../../../../constants";
import { Link } from "react-router-dom";

const AdCategories = () => {
    const _columnsCount = 4;
    const _ls = useSelector((state) => state.layoutReducer);

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col">{strings.title}</th>
            <th scope="col">{strings.parent}</th>
            <th scope="col" style={{ width: "150px", textAlign: "center" }}>
                {general.actions}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = _ls?.pageProps?.items?.map((item, index) => (
            <tr key={item.id}>
                <td scope="row">{index + 1}</td>
                <td>
                    <p>{item.title}</p>
                </td>
                <td>
                    <p>
                        <Link to={`${basePath}/ad_categories/${item.id}`}>
                            {item.parent_title}
                        </Link>
                    </p>
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-w btn-info mb-2"
                        onClick={() => funcs.onChildren(item)}
                        title={strings.children}
                        disabled={_ls?.loading}
                    >
                        {strings.children}
                    </button>
                    <button
                        type="button"
                        className="btn btn-w btn-warning mb-2"
                        onClick={() => funcs.onEdit(item)}
                        title={general.edit}
                        disabled={_ls?.loading}
                    >
                        {general.edit}
                    </button>
                </td>
            </tr>
        ));

        return <TableItems columnsCount={_columnsCount} children={children} />;
    };

    return (
        <AddList
            page={"AdCategories"}
            renderHeader={renderHeader}
            renderItems={renderItems}
            strings={strings}
            funcs={funcs}
        />
    );
};

export default AdCategories;
