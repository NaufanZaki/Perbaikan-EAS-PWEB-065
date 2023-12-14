/** @type {import('payload/types').CollectionConfig} */
// collection Pendaftaran.js
const Pendaftaran = {
    slug: "Pendaftaran",
    access: {
        read: () => true,
        update: () => true,
        delete: () => true,
        create: () => true,
    },
    fields: [
        {
            name: "Nama",
            type: "text",
            required: true,
        },
        {
            name: "Email",
            type: "text",
            required: true,
            unique: true,
        },
        {
            name: "Asal_Sekolah",
            type: "text",
            required: true,
        },
        {
            name: "Status",
            type: "select",
            required: true,
            options: [
                { label: "Waiting", value: "waiting" },
                { label: "Rejected", value: "rejected" },
                { label: "Accepted", value: "accepted" },
            ],
            defaultValue: "waiting", // Default value set to "Waiting"
        },
        {
            name: "Tanggal_Pendaftaran",
            type: "date",
            required: true,
        },
    ],
};

export default Pendaftaran;
