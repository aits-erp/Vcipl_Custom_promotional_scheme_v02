// Copyright (c) 2025, aits and contributors
// For license information, please see license.txt

frappe.query_reports["Custom Promotional Scheme Report"] = {
    "filters": [
        {
            "fieldname": "scheme_name",
            "label": __("Scheme Name"),
            "fieldtype": "Link",
            "options": "Custom Promotional Scheme"
        },
        {
            "fieldname": "party_type",
            "label": __("Party Type"),
            "fieldtype": "Select",
            "options": ["", "Customer", "Supplier"],
            on_change: function () {
                const party_type = frappe.query_report.get_filter_value("party_type");
                const party_filter = frappe.query_report.get_filter("party_name");

                // Clear existing value
                frappe.query_report.set_filter_value("party_name", "");

                if (!party_filter) return;

                if (party_type === "Customer") {
                    party_filter.df.options = "Customer";
                } else if (party_type === "Supplier") {
                    party_filter.df.options = "Supplier";
                } else {
                    party_filter.df.options = "";
                }

                party_filter.refresh();
            }
        },
        {
            "fieldname": "party_name",
            "label": __("Party"),
            "fieldtype": "Link",
            "options": ""   // dynamically set above
        },

        {
            "fieldname": "apply_on",
            "label": __("Apply On"),
            "fieldtype": "Select",
            "options": ["", "Item Code", "Item Group"]
        },
        {
            "fieldname": "item_or_group",
            "label": __("Item or Item Group"),
            "fieldtype": "Data",
            "description": "Enter item code or item group fragment to filter"
        },
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date"
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date"
        },
        {
            "fieldname": "min_invoice_amount",
            "label": __("Min Invoice Amount"),
            "fieldtype": "Currency"
        },
        {
            "fieldname": "max_invoice_amount",
            "label": __("Max Invoice Amount"),
            "fieldtype": "Currency"
        },
        {
            "fieldname": "min_invoice_qty",
            "label": __("Min Invoice Qty"),
            "fieldtype": "Float"
        },
        {
            "fieldname": "max_invoice_qty",
            "label": __("Max Invoice Qty"),
            "fieldtype": "Float"
        },
        {
            "fieldname": "discount_min",
            "label": __("Discount % Min"),
            "fieldtype": "Float"
        },
        {
            "fieldname": "discount_max",
            "label": __("Discount % Max"),
            "fieldtype": "Float"
        },
        {
            "fieldname": "min_free_qty",
            "label": __("Min Free Qty"),
            "fieldtype": "Float"
        },
        {
            "fieldname": "max_free_qty",
            "label": __("Max Free Qty"),
            "fieldtype": "Float"
        },
        {
            "fieldname": "min_amount_off",
            "label": __("Min Amount Off"),
            "fieldtype": "Currency"
        },
        {
            "fieldname": "max_amount_off",
            "label": __("Max Amount Off"),
            "fieldtype": "Currency"
        },
        {
            "fieldname": "free_product",
            "label": __("Free Product"),
            "fieldtype": "Link",
            "options": "Item"
        },
        {
            "fieldname": "show_only_eligible",
            "label": __("Show Only Eligible"),
            "fieldtype": "Check",
            "default": 1
        }
    ],

    onload: function (report) {
        report.page.on("report-rendered", function () {
            const data = report.data || [];
            const partySet = new Set();

            data.forEach(row => {
                if (row.party_name) {
                    partySet.add(row.party_name);
                }
            });

            const partyFilter = report.get_filter("party_name");
            if (!partyFilter) return;

            const options = ["", ...Array.from(partySet).sort()];
            partyFilter.df.options = options;
            partyFilter.refresh();
        });
    }

};
