'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const globActions = Reflux.createActions([
	'nextStep','loaded','setCartoonIndex','bB','sleep','showRank'
]);

export const bindActions = Reflux.createActions([
	'send'
]);

export const gameActions = Reflux.createActions([
	'showPrompt','magnify','combEquip','showMaskLayer','toggleEquip','sceneCut','getEquip','setEquipOptions','setOverStep','commit',
	'timeStart','timeStop','showPaper','commitData','getRankData'
]);