import * as yup from "yup";
import {
    validation,
    addDistrictPage as strings,
} from "../../../constants/strings";

const addDistrictSchema = yup.object().shape({
    name: yup
        .string(validation.stringMessage.replace(":field", strings.name))
        .min(
            3,
            validation.minMessage
                .replace(":field", strings.name)
                .replace(":min", "3")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.name)
                .replace(":max", "50")
        )
        .required(validation.requiredMessage.replace(":field", strings.name)),
    description: yup
        .string(validation.stringMessage.replace(":field", strings.description))
        .max(
            2000,
            validation.maxMessage
                .replace(":field", strings.description)
                .replace(":max", "2000")
        ),
});

export default addDistrictSchema;
