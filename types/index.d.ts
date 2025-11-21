export interface ManyChatPayload {
  data: {
    name?: string;
    first_name?: string;
    last_name?: string;
    gender?: string;
    timezone?: string;

    custom_field_1?: string;
    custom_field_2?: string;
    custom_field_3?: string;
    custom_field_4?: string;
    custom_field_5?: string;
    custom_field_6?: string;
    custom_field_7?: string;
    custom_field_8?: string;
    custom_field_9?: string;
    custom_field_10?: string;
    custom_field_11?: string;
    custom_field_12?: string;

    question_1?: [string, string] | string;
    question_2?: [string, string] | string;
    question_3?: [string, string] | string;
    question_4?: [string, string] | string;
    question_5?: [string, string] | string;
    question_6?: [string, string] | string;
    question_7?: [string, string] | string;
    question_8?: [string, string] | string;
    question_9?: [string, string] | string;
    question_10?: [string, string] | string;
    question_11?: [string, string] | string;
    question_12?: [string, string] | string;
    question_13?: [string, string] | string;
    question_14?: [string, string] | string;
  };
}
