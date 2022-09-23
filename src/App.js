import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import {addr} from "./wallets/wl";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

//Merkle Setup
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const keccak256 = require('keccak256')

console.log(addr);

const addresses = ["0x71Ab58Ff6CFc4696D696E41B879c90ABC2D6c9Cf","0x88EB678cdFFdAc23D79bDdA252F5404c47455b22","0x2e563DE395562db5C2d61d996820246F3A9e8e3E","0x5B2f84c81bB07F9A3Fe5c12968be94ea8a83d4D8","0xa4C2c3603Fe7a44973384a1B7fcb542b36C2613e","0x92cB5E2E2EDCeab850E7cc1bE6B70e9F47FA8809","0xb01D0c94427c5EcE2787E7fA07E9afB226F3be8E","0xE9838544d89F6EaBE117308b762a8e1A62eC97f3","0x454694D422678DF46d93f8944Ce7F3534e9d47CC","0xa9c3163CBc6974CF437bC60F2176Ee92f61268F2","0x826C3A5ACB89448B50d0899e8501454D8192C15f","0xa9c3163CBc6974CF437bC60F2176Ee92f61268F2","0xC591Bd15A83876580ba7b45d799F305200b7EF50","0xEe2165666f26C2449789dD58df3C500095078a04","0xEe2165666f26C2449789dD58df3C500095078a04","0x1a4F35870e75A735FDaeC65E5c2E7D7aB63F7DBD","0x1a4F35870e75A735FDaeC65E5c2E7D7aB63F7DBD","0x35136f45eddD8F16FfD8E0D13f51eE24672464a7","0xa1211b8b5f950F44ED98C2c1546176502B4fEE48","0xeAE37fc1AA12B00b18C505c34bEDC596b8669e6B","0x35F9809f01bad40719944F37d7075C69555a6376","0xfcddaee59bc4f20a77ce8aba14e95f9a280140c9","bitcoin:16d5YF7yu5Mon1aymtMiZMaQwHqE3MKRyF","0x8e56a5C224AAaE5904a09Cd253a743fa0fB38bCa","0x3e65e9298DdBc3268865c18cE8Ec9a13b2Ed20DBbc1qv7lwetnp3f87u33r6cftmp0y7rysgzpz08uqrp","0xef7f6cfA6eacE30e59e59F10f38106cd8D65f033","0x2F6bEC12698b55F4BB2Fc436A74549CEe8E91126","0xfeA113059098BCEe4FF7Da3452d9ad2e639de6F0","0x0aa4e8b45E1Ec9Af929FA50A4466BBC18C1e1Dc4","0x1f776541d0ca7b6C549B264e21A3F060696f78F6","0xA1242B18b09DAd17279aa469767D3009b340D73E","0x8cdF41586114D3610d34FDE70Dc4f9f456D75fb5","0xc7459898750039c3ba165df723932F595C026d52","0xc80285d26e05dEf4A8d0afCA20BA7b17D43a1ED5","0x10460F3a1523caE55Ed92c612f9bEC318b2Cd5eBbnb1mdmtgkdgegpv2p6997yej46zl3zsm67zky3zpz","0x176D0dE787b04F795dFbA1CFDC8B674842d4758a","0x6C163AEed3aC423019e4164c8485530325759c85","0x4b9a8C1c1a7b587dAD7A92560c088A715B4f6871","0x38A20D01F3E893C3713F08E8172f72c8DCC03312","0xA093B9D3b11123a2637Ac19495d9a5eA47dA7e26","0x47dBd3D14C6E840bD882Dae4b73E4695319564D3","0x0092824B94114adc23ac7928CC8a8bdFb796c396","0xfE96aE11E4A36EF71bF97aAA1C810c31D6a757fe","0x0dDC1995C58Faf70Fc8bc77bA49d586c03ef276A","0xD259632aB3E17a1c4A05Aa5EB5527dC2Ac0F1004","0x8a7293c37aD9bC5b8A2d890a7f02bEab3FbD2724","0xB0c89bFbFC1855B6EF668BAb2B906e2425bacf86","0x0eb7aE54A98df29B55a998fC80a5D893774BBE94","0x635422F6a76c63063A312B0C7e8254cF19a0AC0A","0x117A6198d005F20393C62e468C676506DC1072C4","0x2652358417b00cc576D6de0c4B6d01a8D792f1b0","0xE7c40c768115c370Bf7bdC2dddAF56a0c5Cc320c","0x36979f45fB6f9Fa5526148680276Cc40583f3bF1","0xb174AB9eB2846CFc5e27f792BCD2280dE99520De","0x1ECA3B23A593C1D01bD7c6f333c364e9eF70456b","0x7BeB1e0324753b47Bc3AB867BBEF87cFf625b30e","0xF78BDE86009b731b93e74002Ad75CdBD9d463Cc5","0x8b764D363E35d022c6F0c099Bf5D6D3024bC74eC","0xA83744Ebb1321e21dF821759EF43F80a9df279aA","0x54797244B6F843A0c10d9153134A212987D4EA95","0x587ed0683581fE5bD127A3CE4450cFCe7E00629c","0xbf4364597724D3Db5e87d828A80eF2e0b9C0A207","0x53440DB46E0E37A29c80E8B9730a5De9299F711b","0x8298FD2276eCa942cA37E08C213Fff860b9C173d","0xf6F79923003ee9F784e39C7bb6Ff7159d8c263f3","0x32aa4c028E6A84DdB49F8dF266aaDc6648a3439c","0x83b973d09c930b3e9B808C8D5CA23B00a256cd8F","0xeaCF7aC1893Ed7e1376A08DDD9F571fe0613020C","0x52C2FEB751856891136dF45A15C86D406a6601C6","0xA499d008468De9003Cd719Cd39dfBceac0B00e78","0xa5F4c0BbC1D1f413e454884440b212Fdd35f5c52","0xEbcb2cfCD189775F3c4e7A651802164b08f500eF","0x43A6648E364c6bE63bA2a1ED36Cfc3fc403d4319","0x13517fcDB8f43fc9b3C4a690E4796ED1f61F2338","0xec791567FEDE6FeeD862B788E207c52df3b7c96c","0x864E73c48D2Aa34d6e483EAf993f3ae1C25EcdbD","0x91d78b1A6565C5242E7A117421DCE56b26BF3c65","0x58957D35eA5013823c99ff36Cd68cac2cf87BE39","0x0F912F2b3a2BA9af8E0Cc019476e70A9ce1169E3","0xED2C2b222b6dd1F5e43972F3A86c0d08600BbB51","0xED5A39580E146B1A607240a70131d4Cb01617360","0xa5b0a1b67574Df8911345F0aE370822991D545dA","0x38C5aa87167a8A98f8d7f9C9dbCf8D16bE97a858","0x29a2E749c18317c56045D081aFAa7603cf59775d","0xfec3af6358f81f1201fddfc2e554b8e2e8524b10","0x9bfa64e1981b9d159F15F2174eD0640641c26a78","0x81Fb8AD2770FbD7923fC31ee8c24fa89d6Bee5B7","0xc51B0B9Bd2FA223372eC3f709745d14a1A1A3588","0x424f10BB66a1f599a36978C82f07b3A87f14fFDd","0x1c542679a10F2CbDB048BCd9671B9b146A4320BB","0x5D115837a35227fBA323448c07A89AA180C37124","0x0c630EA2892A2E49Cd3a315391664BE7F32FAC12","0xd557d00C375c768Dd6BBA100fB06F6741c124ac7","0xFcAfD927CDaA2f4615300A44d88C7B414B12f9ab","0x9042146ceA0E5A001094f36D72715d47917aaeEB","0xd83A6951Ff8360Fc63f790bA5bfFA339a3660411","0x37a430C2ae3f9Ed1C28e40769cAD167e7E4909D9","0x00bcd6f55B898490dEf6Fbdd0477a4B84eC882CC","0xC70aDbbfae51f26d9eb237E02dD372225c968899","0x7B76d1eE780152f086AbfeD98d0fabbFc253daB9","0x9D458a65940b5D6164C6646609Cd0AeBd5C8D074","0x335dBb58E8C99202393Dc3557B55cF10dc57a9c7","0xeb7cc9460a536d7d3a757541df42b2982f6ab1ad","0x251d09ad19a35F286b92E74d2fDFE724D1537FC9","0xD87Dc9A457F5266700b9a4f361f631D463E05342","0xDE4D957e19F07Ef75b1821da5f6Bd0ae90155177","0xf64e77B65b4B7330b4af711e9Ef6EFb2Ee4Cfd13","0xb65799fa707ba7494043189d7ad4d11901a3628d","0x0Dc2BCc2c85Ae106215f11Ac4F70105D040C1F51","0xa91C95B96429Bdfb4b2960DDBaC4311923b0ADf5","0xFB11Df86294A6973c174168F9d5A14d2dBcab7E3","0xB22F89a8353a9179d8836E8F6663ADcF1fcB4E0A","0x494A7A96459046a32cF9A16e1c99E0871D2323A5","0x94d138Ff1C150bc32160B1bfaeD6203Bf526792D","0x5FD8a3feB46f0435498e9b313e893a1c6878D7b1","0xcc2564c94854635931c36c4A05322BDa7b267839","0xF48B074E485a5D10393Da4f45B0DA77F7b3DC50b","0x9e047EB7721Ae57000d052775C54e55C27a241a2","0xcb30b27da045C7bb9A85dB8B7C13b71F9BfEEF8C","0xC43e4C0e3fA4854D032c905a9CBEF11CaB721619","0xCC5F87642DD82fe1D09e32Ad233CCb33adc6DddF","0x2C8cD927698CDB79c2A2D47564932EFE041ee65F","0x417e823D81a60b4A799A8E1E85C1180d9998fc93","0x417e823D81a60b4A799A8E1E85C1180d9998fc93","0x33393DddF868816425506b1C88ee8087Fc37697f","0x69A0Da9A0cb2a7427B47A95Afbc75E8949314479","0xe26927fD6Af7561a17AEE3B00Ab74Fd847EdC20a","0xFAeD4B8B3Ed70A64ceBCE84749C157F90eb3D6fa","0xbDC7Fe387Fb5F9A912850534a7e045f41E285185","0xA6755CfaD5AFE74D2f7983EF7aBc5aB8BF18CBf7","0xa7ad0f394cAE048dDB4eeB84c63922743Ef016dF","0x8232A7E526AdC8ccb4f0611526201CecA9C52c3F","0x64B24348BC3A3b47625203CF4b3404C49cDFABc1","0xf9b2a38e961eB919CcD4bf17F2124EdE0D1a4f63","0x8fd24C7d21Deed3c035Ca05b1f7B4ebBDeD86BE0","0x94B389f58400fd646a7a4D2D65f81513f57f3eED","0xF14e0A3e1C42DA79e122cEafA03E94FaD1480463","0x18abe27620aC17a9d042282b426f81c4903eC03D","0xb955db051bf09a645c26730752e28f5e3776088f","0x07195BA1dE6B040198760BCDBc28C0cfcB6C9773","0x521eE0ED450eb44cB51d6c1a9Bd5B218C690f4a9","0xf2115622BC1cD7Cb3D38849825516BCD75810790","0x0539D116f1D6Ffe007440e74027505bfBEF1cf32","0x30e72514Ff8DdC9B74Cf43C489bc992DCEd907a4","0x967733bcC6A86e0A44D0d2aB882dc5F4c59d0Dd7","0x8Ee5F63abe06525E99b8a4F40297929af016b859","0x11b3989c13d21633e6FE90ADA07347B0E83414D8","0xDCfc69A0911B15c6e6588F9c1CbB1a2bD11BdbFc","0x7EAD60bA2E3e1F251d167Ef8818dDD4e573b938D","0x2E3F1352a073F6696F359641dac2A280c3058373","0x81e9FDf33b4751F899B231cB0BE3A261313760fC","0x1F2987f92aC767747AC562A91C1204B667d11cfF","0x6175fFd1BE02fe51B0fD90F074573c472231b93f","0x0c21fDc551F2bF7CF7c55f38B5ec13F4B08a9422","0x06349822d5F7c03b2cD5b11dCB273a9B65061B0c","0x43D35a00aBe6Bb8E985624F96B075174AC8f70c6","0x8057638f7f949ba8bf0FE93C05EC6B473E97abd2","0xEf5E7cD8E6eF8726904CfC24f3Af5061F051d045","0x5525eB07b095B91ceB74191414EE4231C06A020D","0x72Ec10e1777e7719fe9c385947C030ad8f908775","0xB49d1D7c4BEEf566580E294dD3cf01FDc88BD509","0x366C91612476b20f226C0aE492F97611B3A94b2E","0xF451215Bd46108fc04A1FeCF67088D431bF61549","0x8AD1015d3D26b3A74F1D3725B9e9250e391ddfFD","0xFE834682725CC23596a269c4E8Dfe99882428f43","0x9d4a2Ccb570f46b9cf5fdE6b141Df0ef2D3F59f7","0x10B57Bf9DDAfdA8E6b828572E9Ad23d24fBcFbaC","0x23c6A2e096462869fccACbAC76FB54223359B4cB","0xF864d1Eb8fa85156b2d6c9A5e97eE5572f1942D2","0x2e727586C3ac2f984Ca1b82791C848A007810780","0xF0CEe291A39c8963f8F3e6cf9e4A962A2d615D32","0xBa3ecC47f4a92756739631c5Eb40e90E8d942156","0xA30BA284d48485CFd4645720d6535Cd3ACE0Fe45","0x50406153c27bB5106B6a2Be2c0D0c3CDd22ee043","0x598DfbBEE1aA951d6E561feA60514d6C8Ccd638c","0xb04aF605A3B0f8BEb9B7e815CbE107Ab79528d28","0x8dc1577cdbbb1976c61d889820153e414d475a4a","0xb8fEd50DbB1aD12C7768beac3f43a97653c7F60a","0xD0dfDD87ecE4D3BB938375DbFbD1301DEceC96eb","0x59B1B6a178a52a38e2982284a98B5353E2E92Ac8","0xBE191BD25e2F0b25E94a1DD649FFAA7aeD2c90c2","0x9110352b2c8a1b2ebc61b17ad7f79242f2ea9ac5","0x4097b69FA7Ac3404932c9070377F4A1AfeA6c015","0xA620d84e1957A8d964d57892b4c8d113632Da0a2","0xdC1210A30326835974D6585f066F79add5d9f066","0x7eb5a10a0149a8589348d19E04fEc9314633f4C4","0x60a77cf699f05104a84C0C1186f087BEc1E80e78","0x60aBFb459df23721DF2d424f345F9F29deeC4fB5","0xF4177f032867B330c2e4D71d426cF5130A56f62a","0x055c1e8edE9d9CC4Ac6905bc5132539F15942b3E","0x1070298571B9156c9497827e116a75d1E383Cb6c","0xf1eD71c20C327ecAA09435cB1BFBaAaB0296df3D","0x06B437c5D1E4c47A70ce72084Ea5001dC607B7aD","0xe942968e65fC3c729A7b01CbFF330c10F9F2a2e5","0xd0aC1427B5876eF45aB4bAf1082734eB108b1612","0x9a263932103D0Bc9062A57737Adf74e46ac043cF","0x25Dd427f7CCa3a5483143a344563CeE86212DabE","0x048554011fa8153EF1c0ffd20710d08bdA1E9275","0x53AaA75973DCeb98A3DaB1f16aa9bdB5fd1E6e2f","0x940A3F31392233bdAd78346DA4a2643EdA5E1007","0x01fF841213d36a7f95bd139F4D6243DAfA9bd77b","0xb032c6ea58124aba2f09d3af5e4556db6a28121d","0xb174AB9eB2846CFc5e27f792BCD2280dE99520De","0xb2af3b87f150ff6a1ff739f78836f5efdc79609b","0x0e801b4dd7291a3e39cda4e85aee29365d09c94a","0xb6ff8c66c519ebc0b023c758a2a79e17d0600e4d","0x6060305d696e113aa1bfb7fa526a1c64d7e5aae8","0x3e912ce545375ca32efb91baf56ae229a7af7ca8","0x5ceb367679f859b49de7bdb91ec4cadaf65855dd","0x8Fb762F0C0a1e4659726d043e4aB015a346d9338","0x36210C88C438001A616687456978Aa4d3AdCba35","0x2F5F4723e4154eaDcAaCCA181685635aD54038Dd","0x1bf74Fc7740ad909967Cd3863f591A8C750c381C","0xc7FC45FB06633E95c83f1610fdC77fF467EfFDa7","0x6e3a508641C82a117e40ea07E70aF96Ec360D952","0xb47afd40f18dceb2202c44297125b67f056f0594","0xa5152C5eCfE6F9e99abA0a19dF67576b78a623d6","0xF84e90063b475D4e3BfD5c2Ba24857a302F9A986","0x183040a7f665ffFab1590118Ba840221D5D6a334","0x3aAa1eBE26603003bf4456F708378b8525f65D83","0x0663F270FEe71E4D969Fa483A432A7c20e062cE5","0x872DB6736F91e56a83b77faa088735ACcDeB3028","0xBD77E6A9C6d8279ea7d324BC5a590e85fED1Ba36","0x89621eEC345F811e8498DbF4Bc53CB07c7d2B77D","0xdc01e7aA71a17C742F5942cB559F8d22304f4363","0x58d7Cc3ED15349f108F19F5Db8136B520ccD5183","0x3C6922e98F9e226eb14c2D70b8885e9B7D1649A0","0x86d97bf129D4c75B04dE9f2DBdA27019F4e64477","0x18401ded0059c258c5DE47Fa79bF4A7A5eB8C211","0x8818f9B634cDdDaE85651DD061a725f653a59e89","0xfEe3Be704099c44243e3C17392a08bFeA5084fd9","0xeB89e07F7BdAC5B56664cef5734ef3D5059FC594","0xd8EA863D9705b08FB644dAf66E9934Adc162905a","0x6B88E2267F926Ce0F3082F5d8274dFa0da25f893","0x32a0c84A45afb658c275522D5ebE0c9475449a0a","0x8610016D634eE5CfB099D112Bf5a4DD17b379566","0xA0285a50b68e49AC001086eaED7FA32DCE6adFEE","0x6FB0974523bE06231516Ee7CCEdad7e1897e8942","0x5Ff68115AC5A84cFAF2A518A50aE8Db8e6e2454E","0x98a83838e6c34273f7F0c6b0F0468BD7eACEC7bc","0x61203060CCAFF4581825b473385B2aA7fCa75E05","0x7902822656690f23B8830c38e4B26A3Dd0Ad5adA","0x1FE83c3F4A48550E526874C4027c399661cF6243","0x1FE83c3F4A48550E526874C4027c399661cF6243","0xee069C0b13aCa29545b3896405c827c55b8b5a6e","0x5f9121e5629EFbe3bc3C2Ca24ab7abb3548D5d15","0xa6356348aa8eEa772147D4ec0E4C9658E73A5c2d","0xF87F9bDac336459B9726B339B1534318502337F7","0x99095B01f51c73b143b487669488E220Fc16EA44","0x30678760C59E32FE30C497B7fa72d944a4d43C77","0x927Efc307c1c150486dB327961a1DcE73067C7dc","0x7b8F83dbdFF5e4E5faA2F152F7DC707Cd55Fc008","0x1D6096103b828eD9A39548C710d1e74125Cb5a02","0x8fB5da1Ff79ABdfEbF18850851144c9fB27FC391","0x43831CCd4D1adE29e185b249c356Cf5367350cE2","0x9F4957664edd8C72edFacF7B654B51F5124076b4","0x8fe5C7111a39d9E724Ee6E692a39697ADe25A282","0xc7ffb11E471a3A1395dA58740A8eaE038BE75147","0x87527F4B6952be5D66F0b1977eAF1Cc71E3bCe3a","0x3f772F5d795f1513f9ef3d0091aF9F1Eea236C23","0x9AeAb123b8bE5446e99AEA994C6965665fcD9499","0xf27CdE013C7E660C4Ec8D9559f50a495f26f2340","0x64B98CdF4DFe1e705Bd731bFa946D09f0E190503","0xE17521b77CFAe40B1AaFf8bDc7308e9D8CED0e24","0xa042807bCC6620Be242E3Eb6f9610B8FD66e2947","0xc5d3F8E7F580Dd9A6A4C02d6eD5Bc5bDAEb171d0","0xa28962A5fbfd949FA02457D7cB3E72E759c2F67a","0x3e916F6dF5Cd2aDFB70679aaB3dC01f74a726ED1","0x2c04A1A8009c0EF94f7C8f05BEa85063ed0ed74A","0xEfe07F49ad8e44B53fFb239819324735faA43123","0x8cB4764E330055dD5Ff1442b2e2C00d856e1Ce95","0x53837A1D9dbD74E2A891b60A8D940d87C49eFF9c","0x597Ec0B7Eda8B743cAC9a8269EaaB06359A315d8","0x46c2e6EFCeb9B4D7F92e300B8E0580D1943CE29B","0xeA28aC10dD21727F46aa2a81348B658f58335Fd5","0x154DBa248C75b8291ED4c8778D51a9C38f5A70BE","0xe330c7ebDe623fd1d8eB3121a9C84bd5386C2819","0x5b95B934c830Bd00889F20c23a98D0CBDd203525","0xA09dD7Fb951be33135b9feA738b285254693DFE1","0x04dDBe6D948BC15B75c23e56a2695d5821824268","0x122fe5457E183A36aea7aEABFD97bd932901Ea69","0xF5283218819a4eedd4DBc9E858bD0e176d589c22","0x279088ec2a3af0f76d702dc703b8cdfb45247e38","0xD4cb100b4c8908C957dd281DC70dD686D43C2B15","0xB176cD563b06Cb6e4d4BB14A8bF8DB4443E9d1DD","0x7e0323d7a6c36516272f339b2f409131212d7c73","0x2BfeCE0E315ACF4425a93F8fF87CfCA4b905175F","0x09fB64Dc80e51Bf90C826875402478E707eF0b53","0xCac5f8bf6d42270A5a17a3E781037d978b089c84","0x79D388EBb36a77D2D9A7ACee9F79F4267e3896D7","0xDF064B6787A7D1A1f2055535Ad20c5363E4F6d1B","0x6838293bd2d3125c0968D5A4a7c66C2700C04cC6","0x95B01984F0eBbD626484cc5942e80975B6192C32","0x1B6aDAA4B4014283e4dB2A01D608B56aFf859fd7","0x0E12DbAa58f0824c976F8E64C0137259F84115E5","0x0805C31D956997Dc4525cdDB3f8050143E861F52","0x3c9F6a6c73f6271f4d408BAA297CbAcee78ffD9A","0xC8DBf19AC37f1CF26833752aBe43Eb3D3e43061A","0xCDb8Ff4fF544FBd8970EAf6522dE4f3035027A78","0xeec828CCd1FF52BaF607bae181E6306dF42537d8","0xe86eed34170cf2f6cf601e1082e41806df14f8e2","0xf3aFFff697777bdec93ceb4ab8B18DE6aE0fB456","0x80eEcAe98C1cBD0C40948aCdc8168c27B0227EFf","0x8EaE92095EeeE69207ABeBe6F548371122E24dDc","0xB0DFc02f47619f52B4431222ddC80245a68f7D1A","0xAE44162c02e65E6dEd310B48C94D3C3278727B11","0x58C5207E2E2B6761b52b6A838EA7a3B2912225f0","0x416c69b3c6c960cb10e0101955f0ad916e7a4901","0xd2490bd9c6cadc2eaeb63f5b9e1f945bc02e5a6b","0xe2885c76312bB800b99D7F45f6cC149FaD210366","0x415145ccb692dcdb448ab55506ea2e9e4308206c","0xbC606E6455634b157598964D79AA1F4995f4C7A0","0x559707C87952Ee055B5B9c65DA349036bcE08ADA","0x5a3cC7A01604d59fdDB2a73fc8dBFfA5679BDaC2","0x3394B4d6ec1CDa0765a985BDfcE2B20Bf553d9F6","0x2df57E3Bd315e9630c533f058B5f6ca3f601F82d","0x5b2bc81CA619bBbb9950f35541E036e633105d5e","0xe521dA9744Ee286B4cDa94aCF3C9f18C909c3502","0xDB771Cb6f13B6726BaCFCE6BA829B9B5B93e2Dd8","0x496d965dfEA4100982A6c486fC0Fc530fC85f2e8","0xC00974ea89E7A24D768F0FFb722572784d0c2C37","0x8967686e247A66a71b264C47B42f20214EcaD0Cb","0xF2C41fE7A99A69F5A2981B259143FcB66ad63BbE","0xF25f7cc249741A4db9d6B4A134f543B3B33944bd","0x07AE6A5E75814b362D0C22AD8B787642C916525d","0x952De40fEDd77d7926C689F1661B5529Ef7B7272","0xFAa332b2f31589074f72F32146114C68c3bE972c","0x45DF0FC179E46125e15855f4f5793127c9ff0a4E","0x6706347961ca66dcdb8962d9b550d2fde95a4510","0x295d02a5F3262f57AFFA4fd18631A06bf6bb4e52","0x6E54e7D700044c10E04c584C2b1fA864c18988aB","0x553Af4e23549064EF00e2ED6F2457dF1310E45A2","0x52962D37B03Df82525035E996A2C64C505F2c5B0","0xeB237B343D7d88C5d2CF991fb9154711FacF71C2","0x78B0f894BfFcA927B9d7CD6ad5e2D74763AC4FdE","0x9D5f9B02E0787321F6c5b1d2dbBbD513b688aA1A","0x341C1DFa1356cd48Dc4e6Bd303e7Ec4638c27CC3"];
const leaves = addresses.map(x => keccak256(x))

const tree = new MerkleTree(leaves, keccak256, {sortPairs:true})
const buf2hex = x => "0x" + x.toString('hex');

console.log(buf2hex(tree.getRoot()))

//", "0xa2ad50d2cbcb1b488d38ab7401f3e3bfc97025981fc47c670dac84e27813f36c
//const leaf = keccak256('", "0x7d436a3736a9f83f62Af88232A6D556eC9d05C9B')
//const proof = tree.getProof(leaf)
//console.log('IS IT ALLOWED? '+proof)
//console.log(buf2hex(tree.verify(proof, leaf, root)))

//const root = tree.getRoot().toString('hex')
//const leaf = SHA256('", "0x7d436a3736a9f83f62Af88232A6D556eC9d05C9B')
//const proof = tree.getProof(leaf)
//console.log(tree.verify(proof, leaf, root)) // true

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  width: 100%;
  @media (min-width: 900px) {
    width: 100%;
  }
  @media (min-width: 1000px) {
    width: 100%;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    //Check Merkle
    const test = tree.getProof(keccak256(blockchain.account)).map(x=>buf2hex(x.data))
    //.map(x=>buf2hex(x.data))
    //const cleanproof = proof.replace(" ","")
    console.log(test)

    //This Contract can only be minted via WhiteList.
    blockchain.smartContract.methods
      .whitelistMint(mintAmount,test)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      console.log("Initial Tree: "+tree)
      const test = tree.getProof(keccak256(blockchain.account)).map(x=>buf2hex(x.data))
      //.map(x=>buf2hex(x.data))
      //const cleanproof = proof.replace(" ","")
      console.log(test)
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"left"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <s.TextTitle style={{
                textAlign: "left",
                fontSize: 90,
                lineHeight:"70px",
                fontWeight: "bold",
                color: "var(--secondary)",
              }}>Real Estate investment
of the Future</s.TextTitle>
<s.TextSubTitle style={{
                textAlign: "left",
                fontSize: 50,
                lineHeight:"50px",
                fontWeight: "300",
                color: "var(--primary-text)",
              }}>Be part of the new movement
mint your membership pass now.</s.TextSubTitle>
            <StyledImg alt={"example"} src={"/config/images/nft.png"} />
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--primary-text)",
              padding: 24,
              borderRadius: 24,
              border: "4px solid var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "300",
                color: "var(--primary)",
              }}>Gold Membership Whitelist Event</s.TextTitle>
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--primary)",
              }}
            >
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
            </s.TextDescription>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--primary)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--primary)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--primary)" }}
                >
                  1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                  {CONFIG.NETWORK.SYMBOL}.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--primary)" }}
                >
                  Excluding gas fees.
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--primary)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--primary)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--primary)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--primary)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : "BUY"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
            <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address. Please note:
            Once you make the purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary)",
            }}
          >
            We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
            successfully mint your NFT. We recommend that you don't lower the
            gas limit.
          </s.TextDescription>
        </s.Container>
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>
        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
