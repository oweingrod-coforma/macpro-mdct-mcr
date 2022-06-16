import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// components
import { Button, Flex } from "@chakra-ui/react";
import { Banner, DateField, ErrorAlert, TextField } from "../index";
// utils
import { makeMediaQueryClasses } from "../../utils/useBreakpoint";
import { bannerId, REPLACE_BANNER_FAILED } from "utils/constants/constants";

const formSchema = yup.object().shape({
  title: yup.string().required("Title text is required"),
  description: yup.string().required("Description text is required"),
  link: yup.string().url("URL must be valid"),
  startDate: yup.number().required("Valid start date is required"),
  startDateYear: yup.number().required().min(2022),
  startDateMonth: yup.number().required().max(12),
  startDateDay: yup.number().required().max(31),
  endDate: yup
    .number()
    .required("Valid end date is required")
    .min(yup.ref("startDate"), "End date cannot be before start date"),
  endDateYear: yup.number().required().min(2022),
  endDateMonth: yup.number().required().max(12),
  endDateDay: yup.number().required().max(31),
});

export const AdminBannerForm = ({ writeAdminBanner, ...props }: Props) => {
  const mqClasses = makeMediaQueryClasses();
  const [error, setError] = useState<string>();

  // make form context
  const form = useForm<FormInput>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  // submit new banner data via write method
  const onSubmit = async (formData: FormInput) => {
    const newBannerData = {
      key: bannerId,
      title: formData.title,
      description: formData.description,
      link: formData.link,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    try {
      await writeAdminBanner(newBannerData);
      document.getElementById("AdminHeader")!.focus();
    } catch (error: any) {
      setError(REPLACE_BANNER_FAILED);
    }
    window.scrollTo(0, 0);
  };

  // set banner preview data
  const formData = form.getValues();
  const bannerPreviewData = {
    title: formData.title || "New banner title",
    description: formData.description || "New banner description",
    link: formData.link || "",
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <ErrorAlert error={error} sxOverrides={sx.errorAlert} />
        <TextField
          name="title"
          label="Title text"
          placeholder="New banner title"
        />
        <TextField
          name="description"
          label="Description text"
          placeholder="New banner description"
          multiline
          rows={3}
        />
        <TextField name="link" label="Link" requirementLabel="Optional" />
        <Flex sx={sx.dateFieldContainer} className={mqClasses}>
          <DateField
            name="startDate"
            label="Start date"
            hint="mm/dd/yyyy (12:00:00am)"
          />
          <DateField
            name="endDate"
            label="End date"
            hint="mm/dd/yyyy (11:59:59pm)"
          />
        </Flex>
        <Flex sx={sx.previewFlex}>
          <Banner bannerData={bannerPreviewData} />
          <Button
            type="submit"
            sx={sx.replaceBannerButton}
            colorScheme="colorSchemes.main"
          >
            Replace Current Banner
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
};

interface Props {
  writeAdminBanner: Function;
  [key: string]: any;
}

interface FormInput {
  title: string;
  description: string;
  link: string;
  startDate: number;
  startDateDay: number;
  startDateMonth: number;
  startDateYear: number;
  endDateDay: number;
  endDateMonth: number;
  endDateYear: number;
  endDate: number;
}

const sx = {
  errorAlert: {
    maxWidth: "40rem",
  },
  dateFieldContainer: {
    ".ds-c-fieldset:first-of-type": {
      marginRight: "3rem",
    },
    "&.tablet, &.mobile": {
      flexDirection: "column",
      ".ds-c-fieldset:first-of-type": {
        marginRight: "0",
      },
    },
  },
  previewFlex: {
    flexDirection: "column",
  },
  replaceBannerButton: {
    marginTop: "1rem !important",
    alignSelf: "end",
  },
};