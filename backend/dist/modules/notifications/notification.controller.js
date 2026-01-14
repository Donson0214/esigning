"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = getNotifications;
exports.readNotifications = readNotifications;
exports.updatePreferences = updatePreferences;
exports.getPreferences = getPreferences;
const notification_service_1 = require("./notification.service");
const notification_validators_1 = require("./notification.validators");
async function getNotifications(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'UNAUTHORIZED' });
        }
        const limitParam = Number(req.query.limit);
        const limit = Number.isFinite(limitParam) ? limitParam : undefined;
        const data = await (0, notification_service_1.listNotifications)(userId, { limit });
        res.json(data);
    }
    catch (err) {
        next(err);
    }
}
async function readNotifications(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'UNAUTHORIZED' });
        }
        const payload = notification_validators_1.notificationReadSchema.parse(req.body ?? {});
        if (!payload.all && (!payload.ids || payload.ids.length === 0)) {
            return res.status(400).json({ error: 'IDS_REQUIRED' });
        }
        const result = await (0, notification_service_1.markNotificationsRead)({
            userId,
            ids: payload.ids,
            all: payload.all,
        });
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}
async function updatePreferences(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'UNAUTHORIZED' });
        }
        const payload = notification_validators_1.notificationPreferencesSchema.parse(req.body ?? {});
        const prefs = await (0, notification_service_1.updateNotificationPreferences)(userId, payload);
        res.json({ preferences: prefs });
    }
    catch (err) {
        next(err);
    }
}
async function getPreferences(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'UNAUTHORIZED' });
        }
        const prefs = await (0, notification_service_1.getNotificationPreferences)(userId);
        res.json({ preferences: prefs });
    }
    catch (err) {
        next(err);
    }
}
