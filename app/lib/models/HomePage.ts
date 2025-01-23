import mongoose from 'mongoose';

const HomePageContentSchema = new mongoose.Schema(
    {
        images: {
            type: [String],
            required: true,
        },
        navbar: [
            {
                name: {
                    type: String,
                    required: true,
                },
                href: {
                    type: String,
                    required: true,
                },
                sublinks: [
                    {
                        name: {
                            type: String,
                        },
                        href: {
                            type: String,
                        },
                    },
                ],
            },
        ],
        logo: {
            type: String,
            required: true,
        },
        slogan: {
            type: String,
            required: true,
        },
        subSlogan: {
            type: String,
            required: true,
        },
        footer: {
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const HomePageContent = mongoose.models.HomePageContent || mongoose.model('HomePageContent', HomePageContentSchema);
export default HomePageContent;
