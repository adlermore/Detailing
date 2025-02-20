import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from 'react';
import Link from "next/link";
import { toast } from "react-toastify";
import Loader from "@/components/universalUI/Loader";
import NormalBtn from "@/components/universalUI/NormalBtn";
import {API_URL_FMCSA } from "@/utils/constants";
import styles from './styles.module.scss'

export default function ThankYou() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [mainLoader, setMainLoader] = useState(true);

    const [unsubscribe, setUnsubscribeData] = useState(null);
    const [selectedReason, setSelectedReason] = useState(null);
    const [additionalComments, setAdditionalComments] = useState('');

    const checkUnsubscribe = async (key) => {
        setLoading(true);
        const apiUrl = API_URL_FMCSA + `/fmcsa/unsubscribe/details?key=${key}`;
        try {
            const data = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            const content = await data.json();
            setUnsubscribeData(content.data);
            if (data.status !== 200) {
                router.push('/404');
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

    const handleUnsubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        const apiUrl = API_URL_FMCSA + `/fmcsa/unsubscribe`;
        const body = {
            key: router.query.key,
            reason_id: selectedReason || unsubscribe.reasons[0].id,
            additional: additionalComments,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast.success('You have successfully unsubscribed.');
            setTimeout(() => {
                router.push('/');
            }, 500);

        } catch (error) {
            console.error("Failed to unsubscribe:", error);
            toast.error('An error occurred while unsubscribing. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (router.query.key) {
            checkUnsubscribe(router.query.key);
        }

    }, [router.query.key]);


    return (
        <Fragment>
            {mainLoader && <Loader />}
            <div className={`${!mainLoader && 'active'} unsubscribe_wrapper  `}>
                <div  className={styles.thankYou}>
                    <h2>Unsubscribe 📩</h2>
                    <h4>It’s hard to see you go...</h4>
                    <div className="user_info_block">
                        Dear <b>{unsubscribe?.full_name}</b> <br />
                        Your email address:  <b>{unsubscribe?.email}</b> <br />
                        You will not receive any more emails from us.
                    </div>

                    <h3>If you have a moment, please let us know why you unsubscribed:</h3>
                    <div className="unsubscribe_list">
                        {unsubscribe?.reasons &&
                            unsubscribe.reasons.map((item, index) => (
                                <label key={item.id} className="flexCenter radioGroup alignCenter gap5 line24 primary">
                                    <input
                                        type="radio"
                                        defaultChecked={index === 0}
                                        value={item.id}
                                        name="unsubscribeReason"
                                        onChange={() => setSelectedReason(item.id)}
                                    />
                                    <span>{item.reason}</span>
                                </label>
                            ))
                        }
                    </div>
                    <div className='textarea_line'>
                        <label htmlFor="additionalComments">
                            Additional Comments:
                        </label>
                        <textarea
                            id="additionalComments"
                            placeholder="We appreciate your feedback..."
                            value={additionalComments}
                            onChange={(e) => setAdditionalComments(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={`unsubscribe_btn`}>
                        <Link href="/" className='primary cancel'>Cancel</Link>
                        <NormalBtn
                            disabled={loading}
                            loading={loading}
                            onClick={handleUnsubscribe}
                            className={`${loading && 'loading'} unsubscribe_button`}
                        >
                            Unsubscribe
                        </NormalBtn>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};