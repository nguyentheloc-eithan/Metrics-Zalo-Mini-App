module.exports = {
    purge: {
        enabled: true,
        content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
    },
    theme: {
        extend: {
            fontSize: {
                subtitle2: [
                    "14px",
                    {
                        lineHeight: "20px",
                        letterSpacing: "0.1px",
                        fontWeight: "500",
                    },
                ],

                subtitle1: [
                    "16px",
                    {
                        lineHeight: "24px",
                        letterSpacing: "0.15px",
                        fontWeight: "400",
                    },
                ],
                body2: [
                    "14px",
                    {
                        lineHeight: "20px",
                        letterSpacing: "0.25px",
                        fontWeight: "400",
                    },
                ],
                caption: [
                    "12px",
                    {
                        lineHeight: "18px",
                        letterSpacing: "0.4px",
                        fontWeight: "400",
                    },
                ],
                overline: [
                    "10px",
                    {
                        lineHeight: "16px",
                        letterSpacing: "1.5px",
                        fontWeight: "400",
                    },
                ],
            },
            colors: {
                primary: "var(--zmp-primary-color)",
                gray: "#767A7F",
                divider: "#E9EBED",
                green: "#288F4E",
                background: "#ffffff",
                skeleton: "rgba(0, 0, 0, 0.1)",
            },
        },
    },
};
