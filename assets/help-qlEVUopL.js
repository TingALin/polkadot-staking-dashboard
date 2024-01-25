const e={definitions:{activeNominators:["活跃提名人",["当前Session中活跃的提名人.","因为您的验证人也可能己超额认选,所以活跃的提名人并不能保证能获得奖励."]],activePools:["活跃提名池",["{NETWORK_NAME}网络上当前活跃的提名池数量."]],activeStakeThreshold:["保持活跃度的抵押阈值",["在一个Era中为保持活跃提名的所需的{NETWORK_UNIT}数量.","适用于提名人和提名池. 对于提名池情况来说, 在加入池时重要的是池的总质押金额不能低于该值.","高于这个标准能保证可以一直在这个Era的活跃提名人名单中. 但这数额不保证能得到奖励,因为您的活跃提名人有超额认选的可能.","在{NETWORK_NAME},只有前{MAX_EXPOSURE_PAGE_SIZE}名提名人才能获得每个验证人的奖励. 确保您的活跃度质押金额高于此阈值将增加获得奖励的机会.","可以从页面中追踪这些指标, 并在必要时执行抵押操作如增加{NETWORK_UNIT}或更改提名或加入其它提名池."]],activeValidator:["活跃验证人",["正在验证区块的验证人. 奖励根据验证人的活动表现累积.","每个Era都会选择一组新的验证人,因此不能保证同一验证人在随后的Era中会处于活跃状态.","{NETWORK_NAME}允许提名者最多提名16名验证人,最大限度地提高您在每个Era 提名活跃验证人的机会."]],averageCommission:["平均佣金",["{NETWORK_NAME}上验证人的平均佣金额.","该指标不包括拥有100%佣金的验证人，因为这些节点通常不让提名是因为他们本身是交易平台自身来抵押."]],averageRewardRate:["平均回报率",["30天平均回报率是质押奖励的预估年回报率。","它是通过验证人过去30天的平均收益计算的, 并根据该平均值和当前{NETWORK_UNIT}的发行量预估年度增长.","除了30天平均回报率之外, 还有30天净平均回报率, 它是扣除平均验证人佣金后的回报率.","平均验证人佣金是当前网络上活跃的所有“非100%佣金”验证人的平均值."]],blockedNominations:["停止提名",["当验证人停止(冻结）被提名功能时，提名人无法提名他们."]],bondedInPool:["质押在池中的金额",["池中当前质押的{NETWORK_UNIT}金额.","直接抵押的质押金额保留在您的帐户中并被锁定，与之不同的是，质押到池中的{NETWORK_UNIT}将被转移到池的隐藏帐户。尽管如此，池成员仍然可以随时解除其资金的绑定."]],bonding:["质押",["质押金额是“锁定”（或抵押）{NETWORK_UNIT}的过程. 质押的{NETWORK_UNIT}将自动分配给一个或多个指定验证人.","作为提名人，您可自主分配提名额。在提名池中，提名池所有者或池提名人将代表您分配提名额，您的质押金将用于支持这些提名.","最低收益抵押额统计数是指在当前Era提名人中质押最少的{NETWORK_UNIT}.该值也是获得奖励所需的最低金额."]],commission:["佣金",["验证人可以获得一定比例的奖励。这部分被称为他们的佣金.","提名佣金率较低的验证人意味着您将获得他们产生的更大份额的奖励.","许多验证人的佣金率为100%，这意味着提名这些验证人将不会获得任何奖励.","这类代表包括交易所运营的验证人,其中提名和奖励分配在相关交易所集中进行.","验证人可以随时更新他们的佣金率，这些变化将对您的盈利能力产生影响. 请务必在页面上监控您的提名，以留意其佣金率更新."]],controllerAccountEligibility:["Controller账户标准",["一个账户要成为Controller,其余额必须有少最低存款. 在{NETWORK_NAME}上最低存款为 {EXISTENTIAL_DEPOSIT} {NETWORK_UNIT}.","如果一个帐户没达到该数额, 您将看到'{NETWORK_UNIT}不足' 的提示.","用至少{EXISTENTIAL_DEPOSIT} {NETWORK_UNIT}将使其符合资格并可选择作为Controller."]],epoch:["Epoch",["Epoch是{NETWORK_NAME} Session的另一个名称. 每个Era分为6个Epoch, 在此期间, 验证人被指定为特定时段或Slots的区块生产者.","1个Epoch在波卡为4小时."]],era:["Era",["在每个Era结束时,根据验证人在当前Era累积的Era点数奖励{NETWORK_UNIT}. 该奖励随后会分配给该验证人下的提名人.","1 Era目前在波卡是24小时."]],eraPoints:["Era 点数",["Era 点由验证人在每个Era累积,取决于验证人的性能.","作为抵押者,您不需要在意Era点数. 一般来说,性能更好的验证人会产生更多的Era 点数，这反过来会得到更高的奖励."]],idealStaked:["最优比例",["理想网络条件下的抵押占发行量的百分比."]],inactiveNominations:["非活跃提名",["指质押资金未分配到当前Era的活跃验证人群中的提名."]],inflation:["通货膨胀",["{NETWORK_UNIT}具有通货膨胀性.所以无封顶数量.","在验证人的奖励是基于抵押金额, 其余归国库所有的情况下, 每年通货膨胀率约为10%.","最新的质押者通货膨胀率数据代表了质押者占通胀的比例。 剩余的通货膨胀记入国库。"]],lastEraPayout:["上一Era收益",["上一Era活跃的总{NETWORK_UNIT}奖励金额.","收益在该Era的活跃验证人之间平均分配,然后进一步分配给参与该Era的活跃提名人.","得到的收益金额取决于提名人和验证人自己在那个Era绑定了多少{NETWORK_UNIT}."]],ledgerAppNotOnLatestRuntimeVersion:["Ledger App非最新运行时版本",["当您的Ledger应用程序未配置为最新的运行时元数据时,会出现此消息. 您仍然可以尝试提交您的交易,但可能会失败","若要防止此警告,请将您的Ledger设备更新为最新版本","运行时升级部署和Ledger应用程序更新之间通常会有延迟。当应用程序更新可用时, 您将能够在Ledger Live中更新应用程序"]],ledgerHardwareWallets:["Ledger硬件钱包",["Staking Dashboard己完全支持可兼容的Ledger设备.您可开始使用Ledger管理{NETWORK_NAME}上的抵押.","因为您的私钥一直在硬件设备上,所以硬件钱包也称为冷钱包.硬件钱包没有连接互联网，所以使用该类钱包可确保安全.","为了使用Ledger设备导入和签署交易, 您的设备必须安装{NETWORK_NAME} Ledger App. 该应用程序可以通过Ledger自己的应用程序Ledger Live安装.","支持USB和蓝牙连接. 如果您的Ledger有蓝牙功能, 并且您的设备允许蓝牙连接, 您将能够通过Ledger设备无线导入帐户并签署交易.","详情请在其官方网站上查找:ledger.com."]],ledgerRejectedTransaction:["Ledger拒绝交易",["己在Ledger设备上拒绝交易, 该交易不会被上交.","请在Ledger设备上通过批准交易来提交交易."]],ledgerRequestTimeout:["Ledger请求超时",["当Ledger设备繁忙时, 或者当操作未能及时完成时, 可能会发生超时报错.","请尝试再次执行该操作, 如果错误仍然存在, 请尝试重新启动Ledger设备."]],lockedBalance:["锁定余额",["在{NETWORK_NAME}中，某些操作需要锁定余额，例如抵押或对治理进行投票。如果您的部分余额被锁定，则无法转移.","该应用显示的锁定余额代表除您的抵押余额外的所有锁定.","您可以用锁定余额做任何提名，但不能加入池，因为这需要转移余额到池帐户."]],minimumToCreatePool:["最低建提名池质押金",["建池所需的最低{NETWORK_UNIT}金额.","创建池需要比加入池更多的存款."]],minimumToJoinPool:["最低入提名池质押金",["加入池所需的最低{NETWORK_UNIT}金额.","该金额不同于创建池所需的质押金."]],nominating:["提名中",["提名是将{NETWORK_UNIT}作为抵押的验证人的过程. 每个帐户最多提名16个验证者.","一旦提名了选定的验证人,他们就会成为您的提名."]],nominationPools:["提名池",["提名池允许用户通过抵押{NETWORK_UNIT}获得奖励.","与个人提名不同，使用提名池只需要少量{NETWORK_UNIT},提名池就会代表您管理提名人选."]],nominationStatus:["提名状态",["当前的抵押状态.","当这些提名人中没有一个是在当前活跃验证人群内（被选择用于验证网络的验证人群体）时，这组提名将处于非活跃状态.","当您的被提名人中至少有一人是活跃时，此提名状态将显示为活跃提名-但这仍然不能保证奖励.","每个活跃验证人的前{MAX_EXPOSURE_PAGE_SIZE}提名人可获得{NETWORK_NAME}奖励。因此，如果被提名人活跃且超额认购，您必须是{MAX_EXPOSURE_PAGE_SIZE}最高质押提名人里的一员才能获得奖励.","如果一位活跃的被提名人没有超额认购，您将获得奖励."]],nominations:["提名",["提名指选择验证人. 在{NETWORK_NAME}里最高提名数为 {MAX_NOMINATIONS}.","对于提名池，提名池所有者和池提名人负责代表所有的池成员提名验证人.","一旦提名一交, 质押金额会自动分配给当前Era活跃的提名人.","只要本人提名中至少有一个提名在当前session中活跃执行验证,您的资金就会与该验证人绑定从而获得奖励."]],nominatorStake:["提名人抵押",["{NETWORK_UNIT}验证人的总提名人质押的数量.","该值和验证人的自我抵押一起形成验证人总抵押数,值得注意的是,该值因为随着提名人在该Session的质押金额给活跃验证人的重新分配,每一个era都会发生变化."]],openAppOnLedger:["在Ledger上打开相应的App",["当{NETWORK_NAME} Ledger App当前未在连接的设备上打开时, 会出现此消息.","请在Ledger设备上打开 {NETWORK_NAME} App 然后重试."]],overSubscribed:["超额认选",["只有每个验证人的前{MAX_EXPOSURE_PAGE_SIZE}名提名人才能在{NETWORK_NAME}获得奖励. 当超过该数时,该验证人将被视为超额认选."]],payout:["收益",["在{NETWORK_NAME}里抵押的收益. 取决于您验证人随时间累积的“Era点数.奖励金额会在每个Era结束时确定(24小时).","要获得抵押奖励,需要手动申领.任何支持该验证人的提名人都可以申领.","一个申请可触发每所有个提名人的奖励申领."]],payoutDestination:["收益到账地址",["收益到账地址决定您的收益发送到哪个帐户","收益可以自动绑定在当前质押额上,也可以发送到您的Stash, Controller或您选择的外部帐户"]],payoutHistory:["收益记录",["一名活跃提名人的收益历史记录.","申领奖励是一个手动的过程，可能会快速连续或以零星方式收到多次收益. 因此，您的收益图可能会在同一天发生多个收益，或者几天没有收益.","这并不意味着您在该期间没有提名或产生奖励，只是该期间的收益尚未被申领."]],polkadotVault:["Polkadot Vault",["Polkadot Vault(前身为Parity Signer)是一种冷钱包解决方案, 允许您在飞行模式下将手机用作网络隔离钱包.","从技术上讲, Vault App不是一个钱包, 因为它不允许转账.","它更像是一个钥匙链工具, 能够创建、管理和恢复帐户."]],poolCommissionChangeRate:["提名池佣金变化率",["佣金变化率由池提名主理人设置,并决定佣金可以增加多少以及多久增加一次.","最大增加率决定了在一次更新中可以增加多少佣金率. 最小延迟决定了在佣金率可被再次提高之前必须通过多少区块.","一旦设置了初始变化率，此后只能设置更限制的值。更限制的值包括更小的最大增加和更大的最小延迟."]],poolCommissionRate:["提名池佣金率",["提名池的佣金率.该值由提名池主理人设置，是提名池将从其成员那里获得的奖励的百分比","必须提供收款人账户才能收取佣金.","佣金率在从提名池分配给会员之前的奖励中提取."]],poolMaxCommission:["提名池最大佣金率",["最高佣金率可被提名池所有者设置.","此值由提名池主理人设置, 是提名池从其成员处获得的奖励的最大百分比.","一旦设定了初始最大佣金, 此后只能设定更限制的值."]],poolMembership:["提名池成员制",["提名池成员身份状态会显示您是否是提名池成员.","提名池成员身份包括提名池成员或提名池所有者.","目前在{NETWORK_NAME}上，帐户一次只能加入一个提名池. 如果想加入另一个提名池，你必须先离开当前提名池.","要离开提名池，只需解除质押并取出所有质押的{NETWORK_UNIT}. 这里提供了一个专用的离开按钮，用于从提名池中解除绑定."]],poolRewards:["提名池的奖励",["作为提名池的活跃参与者所产生的{NETWORK_UNIT}奖励金额.","用户需要申请提名池奖励才能获得奖励.","用户有2种领取奖励的选择. 奖励可以绑定回池, 这将增加您在池中的份额并积累更多奖励. 或作为免费{NETWORK_UNIT}发送到您的帐户."]],poolRoles:["提名池里的角色",["一个提名池里有4种角色,每个角色在管理池的运行方面具有不同的职责.","主理人:可以更改提名人、守护人或其本身. 此外，它可以执行提名人或守护人可以执行的任何操作.","存款人:创建提名池并作为初始成员.只有在所有其他成员离开后能离开提名池.一旦他们退出，提名池将从系统中完全移除.","提名人:可以选择提名池验证人.","守护人:如果提名池被冻结，可以更改池的状态和踢出（无权限解除绑定/撤回)成员."]],proxyAccounts:["代理帐户",["代理帐户是代理另一个帐户的帐户.","在代理帐户术语中, 代理帐户称为委托帐户, 代理帐户所代表的代理帐户被称为委托人帐户.","Staking Dashboard允许被委托人代表委托人签署交易. 如果代理账户在没有委托人的委托的情况下而存在, 则委托人将自动列为只读帐户."]],readOnlyAccounts:["只读帐户",["只读帐户是可以导入但不能签署交易记录的帐户.这意味着您可以查看帐户的余额和质押信息, 但不能使用它执行任何抵押操作."]],reserveBalance:["储备金额",["在{NETWORK_NAME}中，帐户必须有高于一定金额的余额才能在链上存在.这一数额称为“最低存款“.","该应用确保账户永远不会低于这个数额."]],reserveBalanceForExistentialDeposit:["为最低存款存储",["如果您的账户已经锁定了足够涵盖最低存款的金额, 例如为提名而锁定的金额, Staking Dashboard则不会另外锁定任何额外的可用金额.",'在这种情况下, "无" 会显示在存储下的 "为最低存款存储"部分.']],rewardsByCountryAndNetwork:["按国家和网络划分的收益",["显示来自不同国家和IP网络收益的预估百分比.","Polkawatch分布式分析器是通过聚合验证人的IP位置的收益来计算的, 取样期为过去的60天."]],selfStake:["自我抵押",["验证人自身质押的{NETWORK_UNIT}数量.","这个值也会被添加到提名人质押{NETWORK_UNIT}数量中，作为验证人的总抵押数的一部分."]],stashAndControllerAccounts:["Stash和Controller帐户",["Stash和Controller只是用于管理抵押操作的{NETWORK_NAME}账户.","Stash账户是用于存放抵押资金的账户,而Controlle账户则用于代表Stash账户执行抵押操作.","切换帐户实际上是在自动切换Stash帐户到Controller帐户.","请提前导入Stash和Controller帐户。否则将无法使用该应用的所有功能.","可在抵押页面上导入不同的Controller帐户."]],supplyStaked:["抵押比例",["目前全球{NETWORK_UNIT}的累计发行量.","抵押的百分比与{NETWORK_UNIT}总发行量相关."]],totalNominators:["总提名人数",["在网络中参与抵押的账户,无论他们在当前Session中是否活跃.","抵押{NETWORK_UNIT}的前提是成为提名人或加入提名池，提名池本身就是一个提名人."]],validator:["验证人",["验证在{NETWORK_NAME}中继链中的区块的实体. 验证人通过确保网络安全并生成区块在{NETWORK_NAME}起着关键作用.","作为提名人，您可以选择支持哪个验证人并获得奖励."]],wrongTransaction:["错误交易",["此错误发生原因为当Ledger设备正在签名或签名后的交易与Staking Dashboard上当前活动交易不同.","请确保Ledger设备上没有未完成的交易, 然后重试."]],yourBalance:["余额",["除了抵押的总金额外，还包括在提名池中抵押了的{NETWORK_UNIT}总金额.","和抵押的金额不同，质押的池金额是被持有并锁定在提名池中."]]},externals:{bondMore:"质押更多代币到现有的抵押",changeAccount:"更改您的Controller账号",changeDestination:"更改奖励钱包地址",changeNominations:"更改您的提名",chooseValidators:"如何选择验证人?",claimRewards:"申领提名池奖励",connectAccounts:"如何连接您的帐户",createPools:"创建提名池",howToUse:"如何使用Staking Dashboard:概述",rebonding:"解除质押中",stakeDot:"抵押您的DOT",unbondingTokens:"解除您的质押"},modal:{articles:"文章",close:"关闭",definitions:"定义",helpResources:"帮助信息",related:"相关"}},o={help:e};export{o as default,e as help};
