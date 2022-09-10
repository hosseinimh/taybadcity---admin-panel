import { District as Entity } from "../../../../http/entities";
import {
    general,
    addDistrictPage as strings,
} from "../../../../constants/strings";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageActions";
import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../../constants";

let _dispatch;
let _navigate;
let _parentId;
let _content;
let _callbackUrl;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;
};

export const onLoad = (params) => {
    _dispatch(setTitleAction(strings._title));
    setParentId(params?.parenId);

    _callbackUrl = `${basePath}/districts/${_parentId === 0 ? "" : _parentId}`;

    if (_parentId > 0) {
        fetchParent();
    }
};

export const onLayoutState = () => {};

export const onSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let result = await _entity.store(_parentId, data.name, _content);

    if (result === null) {
        _dispatch(setLoadingAction(false));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }

    _dispatch(
        setMessageAction(
            strings.submitted,
            MESSAGE_TYPES.SUCCESS,
            MESSAGE_CODES.OK,
            false
        )
    );

    _navigate(_callbackUrl);
};

export const onCancel = () => {
    _navigate(_callbackUrl);
};

export const setContent = (content) => {
    _content = content;
};

const setParentId = (parentId) => {
    _parentId = !isNaN(parentId) && parentId > 0 ? parentId : 0;
};

const fetchParent = async (id) => {
    let result = await _entity.get(id);

    if (result === null) {
        _dispatch(
            setMessageAction(
                general.itemNotFound,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.ITEM_NOT_FOUND,
                false
            )
        );
        _navigate(_callbackUrl);

        return null;
    }

    _dispatch(setTitleAction(`${strings._title} [ ${result.item.title} ]`));
};
