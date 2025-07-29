import QComponent from "@/components/QComponent"
import React, { Suspense } from "react"

const page = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <QComponent />
        </Suspense>
    )
}

export default page
