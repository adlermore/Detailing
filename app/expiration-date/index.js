'use client'
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from 'react';
import Link from "next/link";
import { toast } from "react-toastify";
import Loader from "@/components/universalUI/Loader";
import NormalBtn from "@/components/universalUI/NormalBtn";
import { API_URL_GUEST } from "@/utils/constants";
import styles from './styles.module.scss'
import { useFormik } from "formik";
import InputField from "@/components/universalUI/InputField";
import PhoneMask from "@/components/universalUI/PhoneMask";
import { expirationDateSchema } from "@/utils/schemas";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function ExpirationDate() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [mainLoader, setMainLoader] = useState(true);
    const [datePicker, setDatePicker] = useState(false);

    const { email } = router.query;

    const checkEmail = async (email) => {
        setLoading(true);
        const apiUrl = API_URL_GUEST + `/check-email?email=${email}`;
        try {
            const data = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            await data.json();

            if (data.status !== 200) {
                router.push('/');
            } else {
                setMainLoader(false)
            }

        } catch (error) {
            console.error("Failed to fetch data:", error);
            router.push('/404');

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!router.isReady) return;

        if (!email) {
            router.push('/404');
            return;
        }

        // Proceed if email exists
        checkEmail(email)
            .then(() => {
                formik.setValues({
                    ...formik.values,
                    email: email,
                });
            })
            .catch(error => {
                console.error("Failed to parse resetEmail:", error);
                router.push('/');
            });
    }, [email , router.isReady]);

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            expiration_date: ""
        },
        onSubmit: async (values) => {
            setLoading(true);
            const apiUrl = API_URL_GUEST + `/expiration-date`;
            const bodyData = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                phone: values.phone,
                ended_at: values.expiration_date
            }
            try {
                const data = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(bodyData),
                });

                const content = await data.json();

                if (data.status !== 200) {
                    toast.error(content.message)
                    if (content.errors.some(error => error.email)) {
                        router.push('/');
                    }
                } else {
                    toast.success(content.message)
                    setTimeout(() => {
                        router.push('/');
                    }, 500);
                }

            } catch (error) {
                console.error("Failed to fetch data:", error);
                router.push('/404');
            } finally {
                setLoading(false);
            }
        },
        validationSchema: expirationDateSchema
    });

    return (
        <Fragment>
            {mainLoader && <Loader />}
            <div className={`${!mainLoader && 'active'} unsubscribe_wrapper  `}>
                <div className={styles.ExpirationDate}>
                    <h2>Expiration Date 📅</h2>
                    <h4>Don’t Let Expired IRP Plates Stop Your Fleet</h4>
                    <div className="user_info_block">
                        We’re here to ensure this never happens
                    </div>
                    <div className="expiration_date_form">
                        <form className="flexColumn" onSubmit={formik.handleSubmit}>
                            <div className="register_inline">
                                <InputField
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.first_name}
                                    error={formik.touched.first_name && formik.errors.first_name}
                                    required={true}
                                    type="first_name"
                                    name="first_name"
                                    label="First Name"
                                    placeholder="Enter First Name"
                                    disabled={loading}
                                />
                                <InputField
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.last_name}
                                    error={formik.touched.last_name && formik.errors.last_name}
                                    required={true}
                                    type="last_name"
                                    name="last_name"
                                    label="Last Name"
                                    disabled={loading}
                                    placeholder="Enter Last Name"
                                />
                            </div>
                            <InputField
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                error={formik.touched.email && formik.errors.email}
                                required={true}
                                disabled
                                type="email"
                                name="email"
                                label="Email Address"
                                placeholder="Enter your email address"
                            />
                            <InputField
                                className="phoneMask"
                                label="Business Phone"
                                required={true}
                                disabled={loading}
                                placeholder="Enter your contact number"
                                error={formik.touched.phone && formik.errors.phone}
                                element={<PhoneMask
                                    type="tel"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your contact number"
                                    autoComplete="off"
                                />}
                            />
                            <InputField
                                error={formik.touched?.expiration_date && formik.errors?.expiration_date}
                                required={true}
                                label="Expiration Date"
                                disabled={loading}
                                element={
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            open={datePicker}
                                            onOpen={() => setDatePicker(true)}
                                            onClose={() => setDatePicker(false)}
                                            className="expiration_picker"
                                            onChange={(value) => {
                                                const formattedDate = dayjs(value).format('YYYY-MM-DD');
                                                formik.setFieldValue('expiration_date', formattedDate, true);
                                            }}
                                            slotProps={{ textField: { readOnly: true, onClick: () => setDatePicker(true) } }}
                                            value={formik.values?.expiration_date ? dayjs(String(formik.values.expiration_date)) : ''}
                                            minDate={dayjs()}
                                            maxDate={dayjs(String(new Date().getUTCFullYear() + 5))}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    onFocus={() => setDatePicker(true)}
                                                    error={formik.touched?.expiration_date && formik.errors?.expiration_date}
                                                    label="Date"
                                                    margin="normal"
                                                    name='expiration_date'
                                                    id={`expiration_date`}
                                                    placeholder="Enter Date"
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                }
                            />
                        </form>
                    </div>
                    <div className={`unsubscribe_btn`}>
                        <Link href="/" className='primary cancel'>Cancel</Link>
                        <NormalBtn
                            disabled={loading}
                            loading={loading}
                            onClick={formik.handleSubmit}
                            className={`${loading && 'loading'} unsubscribe_button`}
                        >
                            Submit
                        </NormalBtn>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};