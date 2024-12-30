

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-1/4 mx-auto text-center mb-5">
            <p className="text-amber-500 mb-2">---{subHeading}---</p>
            <h1 className="text-3xl border-y-4 py-2">{heading}</h1>
        </div>
    );
};

export default SectionTitle;