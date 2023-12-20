import { CollectionConfig } from 'payload/types';

const StatusEnum = {
  WAITING: 'waiting',
  REJECTED: 'rejected',
  ACCEPTED: 'accepted',
};

const Submissions: CollectionConfig = {
  slug: 'submissions',
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      unique: true,
    },
    {
      name: 'institution',
      type: 'text',
      label: 'Asal Sekolah',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Waiting', value: StatusEnum.WAITING },
        { label: 'Rejected', value: StatusEnum.REJECTED },
        { label: 'Accepted', value: StatusEnum.ACCEPTED },
      ],
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Tanggal',
      required: true,
    },
  ],
};

export default Submissions;