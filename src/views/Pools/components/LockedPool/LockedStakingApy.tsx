import { useMemo, memo } from 'react'
import { getVaultPosition, VaultPosition } from 'utils/cakePool'

import { Flex, Text, Box } from '@pancakeswap/uikit'
import { LightGreyCard } from 'components/Card'
import { useTranslation } from 'contexts/Localization'
import { useVaultApy } from 'hooks/useVaultApy'
import { BalanceWithLoading } from 'components/Balance'
import Divider from 'components/Divider'
import { useBUSDCakeAmount } from 'hooks/useBUSDPrice'
import isUndefinedOrNull from 'utils/isUndefinedOrNull'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import BurningCountDown from './Common/BurningCountDown'
import LockedActions from './Common/LockedActions'
import YieldBoostRow from './Common/YieldBoostRow'
import LockDurationRow from './Common/LockDurationRow'
import useUserDataInVaultPrensenter from './hooks/useUserDataInVaultPrensenter'
import { LockedStakingApyPropsType } from './types'

const LockedStakingApy: React.FC<LockedStakingApyPropsType> = ({ stakingToken, stakingTokenBalance, userData }) => {
  const { t } = useTranslation()
  const position = useMemo(
    () =>
      getVaultPosition({
        userShares: userData?.userShares,
        locked: userData?.locked,
        lockEndTime: userData?.lockEndTime,
      }),
    [userData],
  )

  const currentLockedAmountAsBigNumber = useMemo(() => {
    return userData?.balance?.cakeAsBigNumber
  }, [userData?.balance?.cakeAsBigNumber])

  const currentLockedAmount = getBalanceNumber(currentLockedAmountAsBigNumber)

  const usdValueStaked = useBUSDCakeAmount(currentLockedAmount)

  const { weekDuration, lockEndDate, secondDuration, remainingTime } = useUserDataInVaultPrensenter({
    lockStartTime: userData?.lockStartTime,
    lockEndTime: userData?.lockEndTime,
  })

  const { lockedApy } = useVaultApy({ duration: secondDuration })

  // earningTokenBalance includes overdue fee if any
  const earningTokenBalance = useMemo(() => {
    return getBalanceNumber(currentLockedAmountAsBigNumber.minus(userData?.cakeAtLastUserAction))
  }, [currentLockedAmountAsBigNumber, userData?.cakeAtLastUserAction])

  return (
    <LightGreyCard>
      <Flex justifyContent="space-between" mb="16px">
        <Box>
          <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
            {t('BGSP locked')}
          </Text>
          <BalanceWithLoading color="text" bold fontSize="16px" value={currentLockedAmount} decimals={5} />
          <BalanceWithLoading
            value={usdValueStaked}
            fontSize="12px"
            color="textSubtle"
            decimals={2}
            prefix="~"
            unit=" USD"
          />
        </Box>
        <Box>
          <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
            {t('Unlocks In')}
          </Text>
          <Text color={position >= VaultPosition.LockedEnd ? '#D67E0A' : 'text'} bold fontSize="16px">
            {position >= VaultPosition.LockedEnd ? t('Unlocked') : remainingTime}
          </Text>
          <Text color={position >= VaultPosition.LockedEnd ? '#D67E0A' : 'text'} fontSize="12px">
            {t('On %date%', { date: lockEndDate })}
          </Text>
        </Box>
      </Flex>
      <Box mb="16px">
        <LockedActions
          userShares={userData?.userShares}
          locked={userData?.locked}
          lockEndTime={userData?.lockEndTime}
          lockStartTime={userData?.lockStartTime}
          stakingToken={stakingToken}
          stakingTokenBalance={stakingTokenBalance}
          lockedAmount={currentLockedAmountAsBigNumber}
        />
      </Box>
      <Divider />
      {![VaultPosition.LockedEnd, VaultPosition.AfterBurning].includes(position) && (
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
            {t('APY')}
          </Text>
          <BalanceWithLoading color="text" bold fontSize="16px" value={parseFloat(lockedApy)} decimals={2} unit="%" />
        </Flex>
      )}
      <LockDurationRow weekDuration={weekDuration} />
      {![VaultPosition.LockedEnd, VaultPosition.AfterBurning].includes(position) && (
        <YieldBoostRow secondDuration={secondDuration} />
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
          {t('Recent BGSP profit')}
        </Text>
        <BalanceWithLoading color="text" bold fontSize="16px" value={earningTokenBalance} decimals={5} />
      </Flex>
      {position === VaultPosition.LockedEnd && (
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
            {t('After Deduction In')}
          </Text>
          <Text color="failure" bold>
            <BurningCountDown lockEndTime={userData?.lockEndTime} />
          </Text>
        </Flex>
      )}
      {position === VaultPosition.AfterBurning && (
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
            {t('After deduction')}
          </Text>
          <Text color="failure" bold>
            {isUndefinedOrNull(userData?.currentOverdueFee)
              ? '-'
              : t('%amount% Deducted', { amount: getFullDisplayBalance(userData?.currentOverdueFee, 18, 5) })}
          </Text>
        </Flex>
      )}
    </LightGreyCard>
  )
}

export default memo(LockedStakingApy)
