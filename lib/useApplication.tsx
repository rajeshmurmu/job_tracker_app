import { useUserStore } from "@/store/store";
import { useEffect, useState } from "react";

export default function useApplication() {
    const { applications } = useUserStore();
    const [interviewCount, setInterviewCount] = useState(0);
    const [offerCount, setOfferCount] = useState(0);
    const [appliedCount, setAppliedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);


    useEffect(() => {
        const getInterviewsCount = () => {
            const interviews = applications?.filter(
                (application) => application.status === "Interview"
            );
            setInterviewCount(interviews?.length!);
        };

        const getOffersCount = () => {
            const offers = applications?.filter(
                (application) => application.status === "Offer"
            );
            setOfferCount(offers?.length!);
        };


        const getAppliedCount = () => {
            const applied = applications?.filter(
                (application) => application.status === "Applied"
            );
            // console.log(applied);
            setAppliedCount(applied?.length!);
        };

        const getRejectedCount = () => {
            const rejected = applications?.filter(
                (application) => application.status === "Rejected"
            );
            setRejectedCount(rejected?.length!);
        };

        getInterviewsCount();
        getOffersCount();
        getAppliedCount()
        getRejectedCount();
    }, [applications]);

    return { interviewCount, offerCount, appliedCount, rejectedCount };
}