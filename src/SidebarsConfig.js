const sidebarsConfig = {
    accordionItems: [
        {
            eventKey: "0",
            header: "訓練資料查詢",
            icon: "bi bi-search",
            links: [
                {
                    to: "/CertifyQuery",
                    label: "Certify資料查詢",
                },
                {
                    to: "/TechnicianSkillStatus",
                    label: "技術員技能狀況表",
                },
            ],
        },
        {
            eventKey: "1",
            header: "訓練資料維護",
            icon: "bi bi-pie-chart",
            links: [
                {
                    to: "/RegionCodeSettings",
                    label: "區域代碼設定",
                },
                {
                    to: "/MachineModelMaintenance",
                    label: "機型資料維護",
                },
                {
                    to: "/RegionSkillMachineMaintenance",
                    label: "區域、Skill、機型資料維護",
                },
                {
                    to: "/CertifyManualInput",
                    label: "手動輸入Certify資料",
                },
            ],
        },
        {
            eventKey: "3",
            header: "員工資料維護",
            icon: "bi bi-people-fill",
            links: [
                {
                    to: "/EmployeeDataSettings",
                    label: "員工資料設定",
                },
                {
                    to: "/HRSynchronizationSettings",
                    label: "HR資料同步設定",
                },
            ],
        },
        {
            eventKey: "4",
            header: "品質資料維護",
            icon: "bi bi-stars",
            links: [
                {
                    to: "/MOCodeSettings",
                    label: "MO代碼設定",
                },
                {
                    to: "/MORecordMaintenance",
                    label: "MO紀錄資料查詢與維護",
                },
            ],
        },
    ],
};

export default sidebarsConfig;
