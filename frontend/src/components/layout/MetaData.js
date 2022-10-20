import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - Farmer's Hub`}</title>
        </Helmet>
    );
};

export default MetaData;
