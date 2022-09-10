import * as yup from "yup";
import {
    validation,
    addAdCategoryPage as strings,
} from "../../../constants/strings";

const adCategorySchema = yup.object().shape({
    title: yup
        .string(validation.stringMessage.replace(":field", strings.title))
        .min(
            3,
            validation.minMessage
                .replace(":field", strings.title)
                .replace(":min", "3")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.title)
                .replace(":max", "50")
        )
        .required(validation.requiredMessage.replace(":field", strings.title)),
    description: yup
        .string(validation.stringMessage.replace(":field", strings.description))
        .max(
            2000,
            validation.maxMessage
                .replace(":field", strings.description)
                .replace(":max", "2000")
        ),
});

export default adCategorySchema;
