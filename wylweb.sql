/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : wylweb

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-12-20 21:10:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `member`
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES ('1', '123', '123');
INSERT INTO `member` VALUES ('2', 'wyl', '980907');

-- ----------------------------
-- Table structure for `pinglun`
-- ----------------------------
DROP TABLE IF EXISTS `pinglun`;
CREATE TABLE `pinglun` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pinglun
-- ----------------------------
INSERT INTO `pinglun` VALUES ('1', 'sfadsfas');
INSERT INTO `pinglun` VALUES ('4', '你好');
INSERT INTO `pinglun` VALUES ('5', '那年');
INSERT INTO `pinglun` VALUES ('8', '这是回复');
INSERT INTO `pinglun` VALUES ('9', '啦啦啦hhh');
INSERT INTO `pinglun` VALUES ('10', 'fsaddg哈十分艰苦和');
INSERT INTO `pinglun` VALUES ('11', 'fsaddg哈十分艰苦和');
INSERT INTO `pinglun` VALUES ('12', 'fsaddg哈十分艰苦和');
INSERT INTO `pinglun` VALUES ('13', 'fsaddg哈十分艰苦和');
