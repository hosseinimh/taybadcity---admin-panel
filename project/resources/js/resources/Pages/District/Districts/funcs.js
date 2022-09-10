import { useSelector } from "react-redux";

import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";
import {
    general,
    districtsPage as strings,
} from "../../../../constants/strings";
import { District as Entity } from "../../../../http/entities";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import { setMessageAction } from "../../../../state/message/messageActions";

let _dispatch;
let _navigate;
let _ls;
let _parentId;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _ls = useSelector((state) => state.layoutReducer);
};

export const onLoad = (params) => {
    _dispatch(setTitleAction(strings._title));
    setParentId(params?.parentId);
    _dispatch(
        setPagePropsAction({
            item: null,
            items: null,
            action: null,
        })
    );

    fillForm();
};

export const onLayoutState = () => {
    if (_ls?.pageProps === null) {
        return;
    }

    let { action } = _ls?.pageProps;

    if (_ls?.pageProps?.action) {
        _dispatch(setPagePropsAction({ action: null }));
    }

    switch (action) {
        case "ADD":
            addAction();

            return;
        case "CHILDREN":
            childrenAction(_ls?.pageProps?.item);

            return;
        case "EDIT":
            editAction(_ls?.pageProps?.item);

            return;
    }
};

export const onAdd = () => {
    _dispatch(setPagePropsAction({ action: "ADD" }));
};

export const onChildren = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "CHILDREN",
            item,
        })
    );
};

export const onEdit = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "EDIT",
            item,
        })
    );
};

const setParentId = (parentId) => {
    _parentId = !isNaN(parentId) && parentId > 0 ? parentId : 0;
};

const addAction = () => {
    _navigate(
        `${basePath}/districts/add${_parentId === 0 ? "" : "/" + _parentId}`
    );
};

const childrenAction = (item) => {
    if (!isNaN(item?.id) && item?.id > 0) {
        _navigate(`${basePath}/districts/${item.id}`);
    } else {
        _navigate(`${basePath}/districts`);
    }
};

const editAction = (item) => {
    if (!isNaN(item?.id) && item?.id > 0) {
        _navigate(`${basePath}/districts/edit/${item.id}`);
    }
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    if (_parentId > 0) {
        await fetchParent();
    }

    await fetchDistricts(data);

    _dispatch(setLoadingAction(false));
};

const fetchParent = async () => {
    let result = await _entity.get(_parentId);

    if (result === null) {
        _dispatch(
            setMessageAction(
                general.itemNotFound,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.ITEM_NOT_FOUND,
                false
            )
        );
        _navigate(`${basePath}/districts`);

        return null;
    }

    _dispatch(setTitleAction(`${strings._title} [ ${result?.item?.name} ]`));

    return result;
};

const fetchDistricts = async (data = null) => {
    let result = await _entity.paginate(_parentId);

    if (result === null) {
        _dispatch(setPagePropsAction({ items: null }));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }

    _dispatch(setPagePropsAction({ items: result.items }));
};
